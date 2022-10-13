import { FormattedNumberParts } from "react-intl";
import styled from "styled-components";

type Props = {
  value?: number;
  theme?: "primary" | "secondary" | "accent";
};

export const Price = ({ value = 0, theme = "primary" }: Props) => (
  <StyledPriceWrapper buttonTheme={theme}>
    <FormattedNumberParts
      currency="TRY"
      currencyDisplay="narrowSymbol"
      style="currency"
      value={value}
    >
      {(parts) => (
        <>
          {parts[0].value}{" "}
          <StyledPrice>{parts?.slice(1).map((part) => part.value)}</StyledPrice>
        </>
      )}
    </FormattedNumberParts>
  </StyledPriceWrapper>
);

const StyledPriceWrapper = styled.div<{
  buttonTheme: "primary" | "secondary" | "accent";
}>`
  color: ${({ theme, buttonTheme }) => theme.brand[buttonTheme].text};
`;

const StyledPrice = styled.span`
  font-weight: 700;
`;
