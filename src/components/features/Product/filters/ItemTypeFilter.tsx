import { FormattedMessage } from "react-intl";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { ROUTES } from "../../../../utils/routes";

export const ItemTypeFilter = () => {
  const [searchParams] = useSearchParams();
  const itemType = searchParams.get("itemType");

  return (
    <StyledSwitch>
      {[
        <FormattedMessage defaultMessage="mug" id="EuEOqg" key="mug" />,
        <FormattedMessage defaultMessage="shirt" id="eMYi1K" key="shirt" />,
      ].map((item) => (
        <StyledSwitchItem
          className={itemType === item.key ? "active" : ""}
          key={item.key}
          to={{ pathname: ROUTES.items, search: `itemType=${item.key}` }}
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

const StyledSwitchItem = styled(Link)`
  text-decoration: none;
  padding: 6px 16px;
  background: ${({ theme }) => theme.colors.whiteSmoke};
  color: ${({ theme }) => theme.brand.secondary.text};
  border-radius: 2px;
  margin: 16px 0;

  &.active {
    background-color: ${({ theme }) => theme.brand.accent.background};
    color: ${({ theme }) => theme.brand.accent.text};
  }
`;
