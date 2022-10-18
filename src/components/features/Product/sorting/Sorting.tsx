import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { device } from "../../../../theme/breakpoints";
import { Filter } from "../../../ui/Filter";
import { toggleSorting } from "../filter/filterSlice";

const FILTERS = [
  {
    label: <FormattedMessage defaultMessage="Price low to high" id="pBg89n" />,
    key: "price-asc",
    sortBy: "price",
    direction: "asc",
  },
  {
    label: <FormattedMessage defaultMessage="Price high to low" id="tLlmXT" />,
    key: "price-desc",
    sortBy: "price",
    direction: "desc",
  },
  {
    label: <FormattedMessage defaultMessage="New to old" id="+iXa1O" />,
    key: "added-desc",
    sortBy: "added",
    direction: "desc",
  },
  {
    label: <FormattedMessage defaultMessage="Old to new" id="vpo7ww" />,
    key: "added-asc",
    sortBy: "added",
    direction: "asc",
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Sorting = ({ isOpen, setIsOpen }: Props) => {
  const { sorting } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <Filter
      header={<FormattedMessage defaultMessage="Sorting" id="GbhlqN" />}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <StyledList isOpen={isOpen}>
        {FILTERS.map((filter) => (
          <li key={filter.key}>
            <StyledInput
              checked={sorting?.key === filter.key}
              id={filter.key}
              name={filter.key}
              onChange={() => {
                dispatch(toggleSorting({ ...filter }));
              }}
              type="radio"
            />
            <StyledLabel htmlFor={filter.key}>{filter.label}</StyledLabel>
          </li>
        ))}
      </StyledList>
    </Filter>
  );
};

const StyledInput = styled.input`
  display: none;
  vertical-align: middle;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  cursor: pointer;

  &::before {
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
