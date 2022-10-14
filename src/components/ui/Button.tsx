import styled from "styled-components";

type Props = {
  label: JSX.Element;
  onClick: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isFullWidth?: boolean;
};
export const Button = ({
  label,
  onClick,
  type = "button",
  isFullWidth = true,
}: Props) => (
  <StyledButton isFullWidth={isFullWidth} onClick={onClick} type={type}>
    {label}
  </StyledButton>
);

const StyledButton = styled.button<{ isFullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.brand.accent.background};
  color: ${({ theme }) => theme.brand.accent.text};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.brand.accent.background};
  ${({ isFullWidth }) => isFullWidth && `width: 100%;`};
  font-size: 12px;
  font-weight: 600;
  height: 22px;
  cursor: pointer;
`;
