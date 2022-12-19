import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { ImageGalleryList } from './ImageGallery.style';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ dataApi }) {
  const [urlEl, setUrlEl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const elementSearch = urlImg => {
    setUrlEl(urlImg);

    setShowModal(state => !state);
  };

  return (
    <>
      <ImageGalleryList>
        {dataApi.length !== 0
          ? dataApi.map(({ webformatURL, id, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                elementSearch={elementSearch}
              />
            ))
          : null}
      </ImageGalleryList>

      {showModal && (
        <Modal onClose={() => setShowModal(state => !state)}>
          <img src={urlEl} alt="" />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
