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
  @media ${device.tablet} {
    width: 484px;
    margin: 0 auto;
    padding: 20px;
  }

  @media ${device.laptop} {
    width: 608px;
    margin: 0 auto;
    padding: 20px;
  }
`;

const StyledPage = styled.div`
  position: relative;
`;
