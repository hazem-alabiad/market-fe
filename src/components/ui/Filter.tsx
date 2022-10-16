import React, { useState } from "react";
import styled, { css } from "styled-components";

import { device } from "../../theme/breakpoints";
import { Text } from "./Text";

type Props = {
  header: JSX.Element;
  children: React.ReactNode;
};

export const Filter = ({ header, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledSortingContainer>
      <StyledHeader isOpen={isOpen}>
        <Text component="h2" onClick={() => setIsOpen(!isOpen)}>
          {header}
        </Text>
      </StyledHeader>
      <StyledList isOpen={isOpen}>{children}</StyledList>
    </StyledSortingContainer>
  );
};

const StyledSortingContainer = styled.div`
  line-height: 18px;
  color: ${({ theme }) => theme.colors.blueGray};
  list-style: none;
  padding: 0;
  margin: 0;

  @media ${device.desktop} {
    position: absolute;
    width: 296px;
    left: -312px;
    top: 0;
  }
`;

const StyledList = styled.ul<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.brand.primary.background};
  box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
  border-radius: 2px;
  padding: 24px;
  list-style: none;

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;

  @media ${device.desktop} {
    display: flex;
  }

  input:checked + label:before {
    content: "✓";
    color: ${({ theme }) => theme.brand.secondary.text};
    border-color: ${({ theme }) => theme.brand.secondary.text};
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
