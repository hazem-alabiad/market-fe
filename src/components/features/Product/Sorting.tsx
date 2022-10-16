import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { device } from "../../../theme/breakpoints";
import { ROUTES } from "../../../utils/routes";
import { Text } from "../../ui/Text";
import { useUrlParams } from "./filters/useUrlParams";

const FILTERS = [
  {
    label: <FormattedMessage defaultMessage="Price low to high" id="pBg89n" />,
    query: `sort=price&order=asc`,
    key: "price-asc",
  },
  {
    label: <FormattedMessage defaultMessage="Price high to low" id="tLlmXT" />,
    query: `sort=price&order=desc`,
    key: "price-desc",
  },
  {
    label: <FormattedMessage defaultMessage="New to old" id="+iXa1O" />,
    query: `sort=added&order=desc`,
    key: "added-desc",
  },
  {
    label: <FormattedMessage defaultMessage="Old to new" id="vpo7ww" />,
    query: `sort=added&order=asc`,
    key: "added-asc",
  },
];

export const Sorting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { sortBy, sortDirection } = useUrlParams();

  return (
    <StyledSortingContainer>
      <StyledHeader isOpen={isOpen}>
        <Text component="h2" onClick={() => setIsOpen(!isOpen)}>
          <FormattedMessage defaultMessage="Sorting" id="GbhlqN" />
        </Text>
      </StyledHeader>
      <StyledList isOpen={isOpen}>
        {FILTERS.map((filter) => (
          <li key={filter.query}>
            <input
              checked={`${sortBy}-${sortDirection}` === filter.key}
              id={filter.key}
              name={filter.key}
              onChange={() => {
                navigate({ pathname: ROUTES.items, search: filter.query });
              }}
              type="radio"
            />
            <label htmlFor={filter.key}>{filter.label}</label>
          </li>
        ))}
      </StyledList>
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

  input[type="radio"],
  label {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"] + label:before {
    content: "";
    border: 2px solid #dfdee2;
    border-radius: 17.5px;

    display: inline-block;
    vertical-align: middle;
    width: 22px;
    height: 22px;
    margin-right: 12px;
    text-align: center;
  }

  input[type="radio"]:checked + label:before {
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
