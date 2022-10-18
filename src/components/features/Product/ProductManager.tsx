import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/store";
import { useGetProductsQuery } from "../../../services/serverApi";
import { Pagination } from "../pagination/Pagination";
import { useUrlParams } from "./filter/useUrlParams";
import { ProductsGrid } from "./ProductsGrid";

export const ProductList = () => {
  const filters = useAppSelector((state) => state.filters);
  const { page } = useUrlParams();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    page,
    filters,
  });

  if (isLoading) {
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="Loading ..." id="Sd5mzZ" />
      </StyledContainer>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="Error" id="KN7zKn" />
      </StyledContainer>
    );
  }

  if (!products && !isLoading) {
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="No posts :(" id="IixxXI" />
      </StyledContainer>
    );
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
