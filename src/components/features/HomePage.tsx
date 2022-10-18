import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { useTheme } from "styled-components";

import { useAppDispatch } from "../../redux/store";
import { useGetCompaniesQuery } from "../../services/serverApi";
import { device } from "../../theme/breakpoints";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./pagination/header/Header";
import { toggleManufacturer, toggleTag } from "./product/filter/filterSlice";
import { ItemTypeFilter } from "./product/filter/ItemTypeFilter";
import { PropertyFilter } from "./product/filter/PropertyFilter";
import { ProductList } from "./product/ProductManager";
import { Sorting } from "./product/sorting/Sorting";

export const HomePage = () => {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isBranFilterOpen, setIsBranFilterOpen] = useState(false);
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);

  const intl = useIntl();
  const { colors } = useTheme();
  const { data: companies, isLoading, error } = useGetCompaniesQuery();
  const dispatch = useAppDispatch();

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
            error={error}
            header={<FormattedMessage defaultMessage="Brands" id="jWfWEA" />}
            isLoading={isLoading}
            isOpen={isBranFilterOpen}
            list={Object.values(companies?.data || {}).map((company) => ({
              label: company.name,
              slug: company.slug,
            }))}
            onChange={(value: string) => dispatch(toggleManufacturer(value))}
            placeholder={intl.formatMessage({
              defaultMessage: "Search brand",
              id: "TJw7QI",
            })}
            setIsOpen={setIsBranFilterOpen}
            top="240px"
          />
          {/* <PropertyFilter
            error={error}
            header={<FormattedMessage defaultMessage="Tags" id="1EYCdR" />}
            isLoading={isLoading}
            isOpen={isTagFilterOpen}
            list={Object.values(companies?.data || {}).map((company) => ({
              label: company.name,
              slug: company.slug,
            }))}
            placeholder={intl.formatMessage({
              defaultMessage: "Search tag",
              id: "Vz7ja9",
            })}
            setIsOpen={setIsTagFilterOpen}
            top="648px"
          /> */}
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
