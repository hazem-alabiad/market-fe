import { FormattedMessage } from "react-intl";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../theme/breakpoints";
import { ROUTES } from "../../utils/routes";
import { Text } from "../ui/Text";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ProductList } from "./Product/ProductManager";

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const itemType = searchParams.get("itemType");

  return (
    <StyledPage>
      <Header />
      <StyledProductsContainer>
        <StyledHeaderContainer>
          <Text component="h1">
            <FormattedMessage defaultMessage="Products" id="7NFfmz" />
          </Text>
          <StyledSwitch>
            {[
              <FormattedMessage defaultMessage="mug" id="EuEOqg" key="mug" />,
              <FormattedMessage
                defaultMessage="shirt"
                id="eMYi1K"
                key="shirt"
              />,
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
        </StyledHeaderContainer>
        <ProductList />
      </StyledProductsContainer>
      <Footer />
    </StyledPage>
  );
};

const StyledProductsContainer = styled.main`
  margin: 0 auto;

  @media ${device.laptop} {
    width: 608px;
  }
`;

const StyledPage = styled.div`
  position: relative;
`;

const StyledSwitch = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledSwitchItem = styled(Link)`
  text-decoration: none;
  padding: 6px 16px;
  background: #f2f0fd;
  color: ${({ theme }) => theme.brand.secondary.text};
  border-radius: 2px;
  margin: 16px 0;

  &.active {
    background-color: ${({ theme }) => theme.brand.accent.background};
    color: ${({ theme }) => theme.brand.accent.text};
  }
`;

const StyledHeaderContainer = styled.header`
  margin: 0 16px;

  @media ${device.laptop} {
    margin: 0;
  }
`;
