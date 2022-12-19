import { useState, useEffect } from "react";
import api from "./utils/api";
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Loader from './Loader/Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [dataRequest, setDataRequest] = useState([]);
  const [errorApi, setErrorApi] = useState('');
  const [loader, setLoader] = useState(false);

const onSearch = valueSearch => {
  if (searchQuery !== valueSearch) {
      setPageNumber(1);
      setDataRequest([]);
  }
  
      setSearchQuery(valueSearch);
  };

const requestApi = async () => {
    try {
      setLoader(state => !state);

      const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

      setDataRequest([...dataRequest, ...request.hits]);
    } catch (error) {
      setErrorApi(error.message);
      console.log(errorApi);
    } finally {
      setLoader(state => !state);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    requestApi();
  }, [searchQuery, pageNumber]); // eslint-disable-line

    return (
      <div>
        {loader && <Loader />}
        <Searchbar onSearch={onSearch} />
        <ImageGallery dataApi={dataRequest} />
        {dataRequest.length > 11 ? (
          <ButtonLoadMore loadMore={() => setPageNumber(state => state + 1)} />
        ) : null}
      </div>
    );
}

