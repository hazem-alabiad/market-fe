import styled from "styled-components";

import { useGetProductsQuery } from "../../../services/productsApi";
import { Pagination } from "../Pagination/Pagination";
import { useUrlParams } from "./filters/useUrlParams";
import { ProductsGrid } from "./ProductsGrid";

export const ProductList = () => {
  const { itemType, page, sortBy, sortDirection } = useUrlParams();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    page,
    filters: { itemType, sortBy, sortDirection },
  });

  if (isLoading) {
    return <StyledContainer>Loading ...</StyledContainer>;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <StyledContainer>Error</StyledContainer>;
  }

  if (!products) {
    return <StyledContainer>No posts :(</StyledContainer>;
  }

  return (
    <>
      <ProductsGrid cards={products.data} />
      <StyledPaginationWrapper>
        <Pagination />
      </StyledPaginationWrapper>
    </>
  );
};

const StyledPaginationWrapper = styled.nav`
  padding: 0;
  margin: 0;
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  text-align: center;
`;
