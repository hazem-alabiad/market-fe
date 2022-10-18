import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { ReactComponent as Minus } from "../../../../../assets/minus.svg";
import { ReactComponent as Plus } from "../../../../../assets/plus.svg";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { device } from "../../../../../theme/breakpoints";
import { Price } from "../../../../ui/Price";
import { addToCart, removeFromCart } from "./shoppingCartSlice";

type Props = {
  isOpen: boolean;
};

export const ShoppingCartContent = ({ isOpen }: Props) => {
  const { items } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <StyledContainer isOpen={isOpen}>
      {items.map((item) => (
        <StyledCartItem key={item.added}>
          <StyledFlexColumnContainer>
            {item.name}
            <Price theme="secondary" value={item.price} />
          </StyledFlexColumnContainer>
          <StyledFlexRowContainer>
            <StyledOperatorWrapper>
              <StyledQuantityOperator
                onClick={() => dispatch(removeFromCart({ itemId: item.added }))}
              >
                <Minus />
              </StyledQuantityOperator>
            </StyledOperatorWrapper>
            <StyledItemQuantity>{item.quantity}</StyledItemQuantity>
            <StyledOperatorWrapper>
              <StyledQuantityOperator onClick={() => dispatch(addToCart(item))}>
                <Plus />
              </StyledQuantityOperator>
            </StyledOperatorWrapper>
          </StyledFlexRowContainer>
        </StyledCartItem>
      ))}
      {items.length ? (
        <StyledCartTotal>
          <Price theme="secondary" value={totalPrice} />
        </StyledCartTotal>
      ) : (
        <FormattedMessage defaultMessage="Your basket is empty!" id="RrdAEK" />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ isOpen: boolean }>`
  margin: 20px;
  padding: 22px;
  border: 4px solid ${({ theme }) => theme.brand.accent.background};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.brand.primary.background};

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;

  @media ${device.laptop} {
    max-width: 568px;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${device.desktop} {
    position: absolute;
    right: calc(104px + 5vw);
    top: 117px;

    margin: 0;
    border-width: 8px;
    max-width: 296px;
  }
`;

const StyledCartItem = styled.div`
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCartTotal = styled.div`
  min-width: 92px;
  padding: 17px 24px;
  margin-left: auto;

  border: 2px solid ${({ theme }) => theme.brand.accent.background};
  border-radius: 2px;
`;

const StyledItemQuantity = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.brand.accent.background};
  color: ${({ theme }) => theme.brand.accent.text};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledFlexRowContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledOperatorWrapper = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const StyledQuantityOperator = styled.span`
  color: ${({ theme }) => theme.brand.accent.text};
  width: 10px;

  display: flex;
  align-items: center;
`;
