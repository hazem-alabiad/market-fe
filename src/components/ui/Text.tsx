import styled, { css, CSSProperties } from "styled-components";

type Props = {
  component: "h1" | "h2" | "p" | "span" | "div";
  children: React.ReactNode;
  color?: CSSProperties["color"];
  onClick?: () => void;
};

export const Text = ({
  component = "div",
  children,
  color = "inherit",
  onClick,
}: Props) => (
  <StyledText
    as={component}
    color={color}
    component={component}
    onClick={onClick}
  >
    {children}
  </StyledText>
);

const StyledText = styled.div<{ component: Props["component"] }>`
  color: ${({ color }) => color};
  ${({ component, theme }) =>
    (component === "h1" || component === "h2") &&
    css`
      font-size: ${theme.text[component].fontSize};
      font-weight: ${theme.text[component].fontWeight};
      line-height: ${theme.text[component].lineHeight};
      ${() =>
        component === "h1"
          ? css`
              letter-spacing: ${theme.letterSpacing["0.25"]};
            `
          : ""}
      margin: 0;
    `}
`;
