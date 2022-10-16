import { FormattedMessage } from "react-intl";
import styled, { useTheme } from "styled-components";

import { device } from "../../theme/breakpoints";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemTypeFilter } from "./Product/filters/ItemTypeFilter";
import { ProductList } from "./Product/ProductManager";
import { Sorting } from "./Product/Sorting";

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
