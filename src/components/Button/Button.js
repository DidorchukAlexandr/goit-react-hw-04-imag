import React from 'react';
import { LoadMore, Footer } from './Button.styled';

export default function ButtonLoadMore({ loadMore }) {
  return (
    <Footer>
      <LoadMore onClick={loadMore}>Load more</LoadMore>
    </Footer>
  );
}
