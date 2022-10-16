import { FormattedMessage } from "react-intl";
import styled, { useTheme } from "styled-components";

import { device } from "../../theme/breakpoints";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./pagination/header/Header";
import { ItemTypeFilter } from "./product/filters/ItemTypeFilter";
import { ProductList } from "./product/ProductManager";
import { Sorting } from "./product/sorting/Sorting";

export const HomePage = () => {
  const { colors } = useTheme();

  return (
    <StyledPage>
      <Header />
      <StyledProductsContainer>
        <StyledHeaderContainer>
          <Text color={colors.blueGray} component="h1">
            <FormattedMessage defaultMessage="Products" id="7NFfmz" />
          </Text>
          <ItemTypeFilter />
          <Sorting />
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
