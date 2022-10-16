import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { device } from "../../theme/breakpoints";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemTypeFilter } from "./Product/filters/ItemTypeFilter";
import { ProductList } from "./Product/ProductManager";

export const HomePage = () => (
  <StyledPage>
    <Header />
    <StyledProductsContainer>
      <StyledHeaderContainer>
        <Text component="h1">
          <FormattedMessage defaultMessage="Products" id="7NFfmz" />
        </Text>
        <ItemTypeFilter />
      </StyledHeaderContainer>
      <ProductList />
    </StyledProductsContainer>
    <Footer />
  </StyledPage>
);

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

  @media ${device.laptop} {
    margin: 0;
  }
`;
