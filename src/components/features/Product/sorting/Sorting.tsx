import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ROUTES } from "../../../../utils/routes";
import { Filter } from "../../../ui/Filter";
import { useUrlParams } from "../filter/useUrlParams";

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
  const navigate = useNavigate();
  const { sortBy, sortDirection } = useUrlParams();

  return (
    <Filter header={<FormattedMessage defaultMessage="Sorting" id="GbhlqN" />}>
      {FILTERS.map((filter) => (
        <li key={filter.query}>
          <StyledInput
            checked={`${sortBy}-${sortDirection}` === filter.key}
            id={filter.key}
            name={filter.key}
            onChange={() => {
              navigate({ pathname: ROUTES.items, search: filter.query });
            }}
            type="radio"
          />
          <StyledLabel htmlFor={filter.key}>{filter.label}</StyledLabel>
        </li>
      ))}
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
