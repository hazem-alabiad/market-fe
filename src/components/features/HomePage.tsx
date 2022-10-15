import styled from "styled-components";

import { device } from "../../theme/breakpoints";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ProductList } from "./Product/ProductManager";

export const HomePage = () => (
  <StyledPage>
    <Header />
    <StyledProductsContainer>
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
