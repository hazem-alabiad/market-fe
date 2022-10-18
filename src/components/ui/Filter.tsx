import React from "react";
import styled, { css, CSSProperties } from "styled-components";

import { device } from "../../theme/breakpoints";
import { Text } from "./Text";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  header: JSX.Element;
  children: React.ReactNode;
  top?: CSSProperties["top"];
};

export const Filter = ({
  header,
  top = 0,
  children,
  isOpen,
  setIsOpen,
}: Props) => (
  <StyledContainer top={top}>
    <StyledHeader isOpen={isOpen}>
      <Text component="h2" onClick={() => setIsOpen(!isOpen)}>
        {header}
      </Text>
    </StyledHeader>
    {children}
  </StyledContainer>
);

const StyledContainer = styled.div<{ top: Props["top"] }>`
  line-height: 18px;
  color: ${({ theme }) => theme.colors.blueGray};
  list-style: none;
  padding: 0;
  margin: 0;

  @media ${device.desktop} {
    position: absolute;
    width: 296px;
    left: -312px;
    top: ${({ top }) => top};
  }
`;

const StyledHeader = styled.div<{ isOpen: boolean }>`
  padding: 14px;
  width: fit-content;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  color: ${({ theme }) => theme.brand.secondary.text};
  margin-bottom: 12px;
  cursor: pointer;

  ${({ isOpen, theme }) =>
    isOpen
      ? css`
          background-color: ${theme.brand.accent.background};
          color: ${theme.brand.accent.text};
        `
      : undefined}

  @media ${device.desktop} {
    padding: 0;
    color: ${({ theme }) => theme.colors.blueGray};
    background-color: inherit;
    pointer-events: none;
  }
`;
