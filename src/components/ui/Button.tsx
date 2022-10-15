import styled, { CSSProperties } from "styled-components";

type Props = {
  label: JSX.Element;
  onClick: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isFullWidth?: boolean;
  height?: CSSProperties["height"];
};
export const Button = ({
  label,
  onClick,
  type = "button",
  isFullWidth = false,
  height,
}: Props) => (
  <StyledButton
    height={height}
    isFullWidth={isFullWidth}
    onClick={onClick}
    type={type}
  >
    <StyledLabel>{label}</StyledLabel>
  </StyledButton>
);

const StyledButton = styled.button<{
  isFullWidth?: boolean;
  height?: CSSProperties["height"];
}>`
  background-color: ${({ theme }) => theme.brand.accent.background};
  color: ${({ theme }) => theme.brand.accent.text};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.brand.accent.background};
  ${({ height }) => height && `height: ${height}`};
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const StyledLabel = styled.span`
  display: flex;
  align-items: center;
`;
