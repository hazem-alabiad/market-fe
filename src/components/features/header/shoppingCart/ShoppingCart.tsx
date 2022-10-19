import styled from "styled-components";

import { ReactComponent as Basket } from "../../../../assets/basket.svg";
import { useAppSelector } from "../../../../redux/store";
import { Price } from "../../../ui/Price";

export const ShoppingCart = () => {
  const { items } = useAppSelector((state) => state.shoppingCart);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <StyledShoppingCart>
      <StyledBasket>
        <Basket />
      </StyledBasket>
      <StyledPrice>
        <Price theme="accent" value={totalPrice} />
      </StyledPrice>
    </StyledShoppingCart>
  );
};

const StyledShoppingCart = styled.div`
  color: ${({ theme }) => theme.brand.accent.text};
  display: flex;
  cursor: pointer;
`;

const StyledPrice = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBasket = styled(StyledPrice)`
  width: 24px;
`;
