import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { device } from "../../../theme/breakpoints";
import { ShoppingCart } from "./shoppingCart/ShoppingCart";
import { ShoppingCartContent } from "./shoppingCart/ShoppingCartContent";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <nav>
          <StyledUl>
            <StyledLogo>
              <StyledA href="." rel="home">
                <Logo />
              </StyledA>
            </StyledLogo>
            <StyledShoppingCartWrapper onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCart />
            </StyledShoppingCartWrapper>
          </StyledUl>
        </nav>
      </StyledHeader>
      <ShoppingCartContent isOpen={isOpen} />
    </>
  );
};

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.brand.accent.background};
  margin-bottom: 38px;

  @media ${device.laptop} {
    padding: 0 104px;
  }

  @media ${device.desktop} {
    padding: 0 calc(104px + 5vw);
  }
`;

const StyledUl = styled.ul`
  height: 77px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledA = styled.a`
  cursor: pointer;
`;

const StyledLogo = styled.li`
  width: 141px;
  margin: 17px auto 17px 28px;

  @media ${device.tablet} {
    margin: 17px auto;
  }

  @media ${device.laptop} {
    padding-right: auto;
  }
`;

const StyledShoppingCartWrapper = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  position: absolute;
  right: 0;
  height: 100%;

  @media (pointer: fine) {
    &:hover {
      transition: all 500ms ease;
      background-color: #147594;
    }
  }
`;
