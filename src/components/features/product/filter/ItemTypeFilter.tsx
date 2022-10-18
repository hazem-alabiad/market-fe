import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { toggleItemType } from "./filterSlice";

export const ItemTypeFilter = () => {
  const { itemType } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <StyledSwitch>
      {[
        <FormattedMessage defaultMessage="mug" id="EuEOqg" key="mug" />,
        <FormattedMessage defaultMessage="shirt" id="eMYi1K" key="shirt" />,
      ].map((item) => (
        <StyledSwitchItem
          className={itemType === item.key ? "active" : ""}
          key={item.key}
          onClick={() => dispatch(toggleItemType(item.key))}
        >
          {item}
        </StyledSwitchItem>
      ))}
    </StyledSwitch>
  );
};

const StyledSwitch = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledSwitchItem = styled.div`
  text-decoration: none;
  padding: 6px 16px;
  background: ${({ theme }) => theme.colors.whiteSmoke};
  color: ${({ theme }) => theme.brand.secondary.text};
  border-radius: 2px;
  margin: 16px 0;
  cursor: pointer;

  &.active {
    background-color: ${({ theme }) => theme.brand.accent.background};
    color: ${({ theme }) => theme.brand.accent.text};
  }
`;
