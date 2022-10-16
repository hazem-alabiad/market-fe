import styled, { css } from "styled-components";

type Props = {
  component: "h1" | "p" | "span" | "div";
  children: React.ReactNode;
};

export const Text = ({ component = "div", children }: Props) => (
  <StyledText as={component} component={component}>
    {children}
  </StyledText>
);

const StyledText = styled.div<{ component: Props["component"] }>`
  ${({ component, theme }) =>
    component === "h1" &&
    css`
      font-size: ${theme.text.h1.fontSize};
      font-weight: ${theme.text.h1.fontWeight};
      line-height: ${theme.text.h1.lineHeight};
      letter-spacing: ${theme.letterSpacing["0.25"]};
      margin: 0;
    `}
`;
