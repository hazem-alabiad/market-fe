import styled from "styled-components";

import { ReactComponent as Basket } from "../../../../../assets/basket.svg";
import { Price } from "../../../../ui/Price";

export const ShoppingCart = () => (
  <StyledShoppingCart>
    <StyledBasket>
      <Basket />
    </StyledBasket>
    <StyledPrice>
      <Price theme="accent" />
    </StyledPrice>
  </StyledShoppingCart>
);

const StyledShoppingCart = styled.div`
  color: ${({ theme }) => theme.brand.accent.text};
  display: flex;
`;

const StyledPrice = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBasket = styled(StyledPrice)`
  width: 24px;
`;
