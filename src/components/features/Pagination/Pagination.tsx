import { FormattedMessage, FormattedNumber } from "react-intl";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as LeftArrow } from "../../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/right-arrow.svg";
import { useGetProductsQuery } from "../../../services/productsApi";
import { device } from "../../../theme/breakpoints";
import { ROUTES } from "../../../utils/routes";

export const Pagination = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const itemType = searchParams.get("itemType");

  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ page, itemType });

  const totalPages = products?.total_pages || 1;

  return (
    <>
      <StyledBigScreenPagination
        breakLabel="..."
        nextLabel={
          <StyledPaginationNext
            disabled={isFetching || isLoading || page === products?.total_pages}
            onClick={() =>
              navigate({
                search: `page=${page + 1}`,
                pathname: ROUTES.items,
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
            search: `page=${event.selected + 1}`,
            pathname: ROUTES.items,
          });
        }}
        pageCount={totalPages}
        pageRangeDisplayed={4}
        previousLabel={
          <StyledPaginationPrev
            disabled={isFetching || isLoading || page === 1}
            onClick={() =>
              navigate({
                search: `page=${page - 1}`,
                pathname: ROUTES.items,
              })
            }
          >
            <StyledIconWrapper>
              <LeftArrow />
            </StyledIconWrapper>
            <FormattedMessage defaultMessage="Prev" id="LYaNlL" />
          </StyledPaginationPrev>
        }
        renderOnZeroPageCount={() => null}
      />
      <StyledSmallScreenPagination>
        <StyledPaginationPrev
          disabled={isFetching || isLoading || page === 1}
          onClick={() =>
            navigate({
              search: `page=${page - 1}`,
              pathname: ROUTES.items,
            })
          }
        >
          <StyledIconWrapper>
            <LeftArrow />
          </StyledIconWrapper>
          <FormattedMessage defaultMessage="Prev" id="LYaNlL" />
        </StyledPaginationPrev>
        <select
          onChange={() => {
            navigate({
              search: `page=${page + 1}`,
              pathname: ROUTES.items,
            });
          }}
          value={page}
        >
          {Array.from({ length: totalPages })
            .map((_, index) => index + 1)
            .map((pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                <FormattedNumber value={pageNumber} />
              </option>
            ))}
        </select>
        <StyledPaginationNext
          disabled={isFetching || isLoading || page === products?.total_pages}
          onClick={() =>
            navigate({
              search: `page=${page + 1}`,
              pathname: ROUTES.items,
            })
          }
        >
          <FormattedMessage defaultMessage="Next" id="9+Ddtu" />
          <StyledIconWrapper>
            <RightArrow />
          </StyledIconWrapper>
        </StyledPaginationNext>
      </StyledSmallScreenPagination>
    </>
  );
};

const StyledBigScreenPagination = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
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

  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`;

const StyledSmallScreenPagination = styled.nav`
  display: flex;
  gap: 16px;
  color: ${({ theme }) => theme.brand.primary.text};
  height: 36px;

  path {
    fill: ${({ theme }) => theme.brand.primary.text};
  }

  &:disabled {
    cursor: not-allowed;

    & > * {
      pointer-events: none;
    }
  }

  @media ${device.tablet} {
    display: none;
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
