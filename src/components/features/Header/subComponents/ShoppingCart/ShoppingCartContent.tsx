import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { ReactComponent as Minus } from "../../../../../assets/minus.svg";
import { ReactComponent as Plus } from "../../../../../assets/plus.svg";
import { device } from "../../../../../theme/breakpoints";
import { Price } from "../../../../ui/Price";
import { useShoppingCart } from "./useShoppingCart";

type Props = {
  isOpen: boolean;
};

export const ShoppingCartContent = ({ isOpen }: Props) => {
  const { cart, addItem, removeItem } = useShoppingCart();

  return (
    <StyledContainer isOpen={isOpen}>
      {cart.map((item) => (
        <StyledCartItem key={item.added}>
          <StyledFlexColumnContainer>
            {item.name}
            <Price theme="secondary" value={item.price} />
          </StyledFlexColumnContainer>
          <StyledFlexRowContainer>
            <StyledOperatorWrapper>
              <StyledQuantityOperator onClick={() => removeItem(item.added)}>
                <Minus />
              </StyledQuantityOperator>
            </StyledOperatorWrapper>
            <StyledItemQuantity>{item.quantity}</StyledItemQuantity>
            <StyledOperatorWrapper>
              <StyledQuantityOperator onClick={() => addItem(item)}>
                <Plus />
              </StyledQuantityOperator>
            </StyledOperatorWrapper>
          </StyledFlexRowContainer>
        </StyledCartItem>
      ))}
      {cart.length ? (
        <StyledCartTotal>
          <Price theme="secondary" />
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
  width: 92px;
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
