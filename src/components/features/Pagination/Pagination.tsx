import { FormattedMessage } from "react-intl";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as LeftArrow } from "../../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/right-arrow.svg";
import { useProductsQuery } from "../../../services/productsApi";
import { device } from "../../../theme/breakpoints";
import { ROUTES } from "../../../utils/routes";

export const Pagination = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const { data: products, isLoading, isFetching } = useProductsQuery(page);

  return (
    <>
      <CustomPagination
        breakLabel="..."
        nextLabel={
          <StyledPaginationNext
            disabled={isFetching || isLoading || page === products?.total_pages}
            onClick={() =>
              navigate({
                search: `page=${page + 1}`,
                pathname: ROUTES.products,
              })
            }
          >
            <FormattedMessage defaultMessage="Next" id="9+Ddtu" />
            <StyledIconWrapper>
              <RightArrow />
            </StyledIconWrapper>
          </StyledPaginationNext>
        }
        onPageChange={(event) => {
          navigate({
            search: `page=${event.selected}`,
            pathname: ROUTES.products,
          });
        }}
        pageCount={products?.total_pages || 0}
        pageRangeDisplayed={4}
        previousLabel={
          <StyledPaginationPrev
            disabled={isFetching || isLoading || page === 1}
            onClick={() =>
              navigate({
                search: `page=${page - 1}`,
                pathname: ROUTES.products,
              })
            }
          >
            <StyledIconWrapper>
              <LeftArrow />
            </StyledIconWrapper>
            <FormattedMessage defaultMessage="Prev" id="LYaNlL" />
          </StyledPaginationPrev>
        }
      />
    </>
  );
};

const CustomPagination = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  align-items: center;
  color: ${({ theme }) => theme.brand.primary.text};
  height: 40px;

  li a {
    padding: 12px;
    cursor: pointer;

    path {
      fill: ${({ theme }) => theme.brand.primary.text};
    }
    color: ${({ theme }) => theme.brand.primary.text};
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${({ theme }) => theme.brand.secondary.text};
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: not-allowed;
  }
  li:hover {
    path {
      fill: ${({ theme }) => theme.brand.secondary.text};
    }
    color: ${({ theme }) => theme.brand.secondary.text};
  }
`;

const StyledPaginationItem = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.brand.primary.text};

  &:disabled {
    cursor: not-allowed;

    & > * {
      pointer-events: none;
    }
  }

  &:hover {
    path {
      fill: ${({ theme }) => theme.brand.secondary.text};
    }
    color: ${({ theme }) => theme.brand.secondary.text};
  }
`;

const StyledPaginationNext = styled(StyledPaginationItem)`
  @media ${device.laptop} {
    padding-left: 50px;
  }
`;

const StyledPaginationPrev = styled(StyledPaginationItem)`
  @media ${device.laptop} {
    padding-right: 50px;
  }
`;

const StyledIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
