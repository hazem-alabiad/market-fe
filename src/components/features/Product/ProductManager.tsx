import { useState } from "react";
import { FormattedMessage } from "react-intl";

import { useProductsQuery } from "../../../services/productsApi";
import { ProductsGrid } from "./ProductsGrid";

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useProductsQuery(page);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <div>Error</div>;
  }

  if (!products) {
    return <div>No posts :(</div>;
  }

  return (
    <>
      <ProductsGrid cards={products.data} />
      <button
        disabled={isFetching}
        onClick={() => setPage(page - 1)}
        type="button"
      >
        <FormattedMessage defaultMessage="Previous" id="JJNc3c" />
      </button>
      <button
        disabled={isFetching}
        onClick={() => setPage(page + 1)}
        type="button"
      >
        <FormattedMessage defaultMessage="Next" id="9+Ddtu" />
      </button>
    </>
  );
};
