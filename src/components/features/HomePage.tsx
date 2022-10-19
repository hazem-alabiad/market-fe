import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { useTheme } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  useGetCompaniesQuery,
  useGetProductsQuery,
} from "../../services/serverApi";
import { device } from "../../theme/breakpoints";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./header/Header";
import { toggleManufacturer, toggleTag } from "./product/filter/filterSlice";
import { ItemTypeFilter } from "./product/filter/ItemTypeFilter";
import { PropertyFilter } from "./product/filter/PropertyFilter";
import { useUrlParams } from "./product/filter/useUrlParams";
import { ProductList } from "./product/ProductManager";
import { Sorting } from "./product/sorting/Sorting";

export const HomePage = () => {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isBranFilterOpen, setIsBranFilterOpen] = useState(false);
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);
  const { colors } = useTheme();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.filters);
  const { page } = useUrlParams();
  const {
    data: companies,
    isLoading: companiesIsLoading,
    error: companiesError,
  } = useGetCompaniesQuery();
  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsError,
  } = useGetProductsQuery({ page, filters });

  return (
    <StyledPage>
      <Header />
      <StyledProductsContainer>
        <StyledHeaderContainer>
          <Text color={colors.blueGray} component="h1">
            <FormattedMessage defaultMessage="Products" id="7NFfmz" />
          </Text>
          <ItemTypeFilter />
          <Sorting isOpen={isSortingOpen} setIsOpen={setIsSortingOpen} />
          <PropertyFilter
            checkedList={filters.manufacturers}
            error={companiesError}
            header={<FormattedMessage defaultMessage="Brands" id="jWfWEA" />}
            isLoading={companiesIsLoading}
            isOpen={isBranFilterOpen}
            list={Object.values(companies?.data || {}).map((company) => ({
              label: company.name,
              key: company.slug,
            }))}
            onChange={(value: string) => dispatch(toggleManufacturer(value))}
            placeholder={intl.formatMessage({
              defaultMessage: "Search brand",
              id: "TJw7QI",
            })}
            setIsOpen={setIsBranFilterOpen}
            top="240px"
          />
          <PropertyFilter
            checkedList={[filters.tag || ""]}
            error={productsError}
            header={<FormattedMessage defaultMessage="Tags" id="1EYCdR" />}
            isLoading={productsIsLoading}
            isOpen={isTagFilterOpen}
            list={
              Array.from(
                new Set(products?.data.flatMap((product) => product.tags))
              ).map((product) => ({
                label: product,
                key: product,
              })) || []
            }
            onChange={(value: string) => dispatch(toggleTag(value))}
            placeholder={intl.formatMessage({
              defaultMessage: "Search tag",
              id: "Vz7ja9",
            })}
            setIsOpen={setIsTagFilterOpen}
            top="576px"
          />
        </StyledHeaderContainer>
        <ProductList />
      </StyledProductsContainer>
      <Footer />
    </StyledPage>
  );
};

const StyledProductsContainer = styled.main`
  margin: 0 auto;

  @media ${device.laptop} {
    width: 608px;
  }
`;

const StyledPage = styled.div`
  position: relative;
`;

const StyledHeaderContainer = styled.header`
  margin: 0 16px;
  position: relative;

  @media ${device.laptop} {
    margin: 0;
  }
`;
