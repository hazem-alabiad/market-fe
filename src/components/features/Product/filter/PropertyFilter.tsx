import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { CSSProperties } from "styled-components";

import { device } from "../../../../theme/breakpoints";
import { Filter } from "../../../ui/Filter";

type Props<Error> = {
  isOpen: boolean;
  header: JSX.Element;
  top?: CSSProperties["top"];
  placeholder?: string;
  list: Array<{ label: string; key: string }>;
  checkedList: Array<string>;
  isLoading: boolean;
  error: Error;

  onChange: (value: string) => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const PropertyFilter = <Error,>({
  isOpen,
  header,
  top = 0,
  placeholder = "",
  list,
  checkedList,
  isLoading,
  error,
  onChange,
  setIsOpen,
}: Props<Error>) => {
  const intl = useIntl();
  const [search, setSearch] = useState("");

  const filteredList = search
    ? list.filter((item) =>
        item.label.toLowerCase().startsWith(search.toLowerCase())
      )
    : list;

  if (isLoading) {
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="Loading ..." id="Sd5mzZ" />
      </StyledContainer>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="Error" id="KN7zKn" />
      </StyledContainer>
    );
  }

  if (!list.length && !isLoading) {
    return (
      <StyledContainer>
        <FormattedMessage defaultMessage="No filter items :(" id="WRNHTL" />
      </StyledContainer>
    );
  }

  return (
    <Filter header={header} isOpen={isOpen} setIsOpen={setIsOpen} top={top}>
      <StyledFilterContent isOpen={isOpen}>
        <StyledSearchBar
          aria-label={intl.formatMessage({
            defaultMessage: "Search through site content",
            id: "AwJeM5",
          })}
          id={placeholder}
          name={placeholder}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={search}
        />
        <StyledList>
          {filteredList.map((item, index) => (
            <li key={item.key}>
              <StyledInput
                checked={checkedList.includes(item.key)}
                id={`${index}_${item.key}`}
                name={`${index}_${item.key}`}
                onChange={() => onChange(item.key)}
                type="checkbox"
              />
              <StyledLabel htmlFor={`${index}_${item.key}`}>
                {item.label}
              </StyledLabel>
            </li>
          ))}
        </StyledList>
      </StyledFilterContent>
    </Filter>
  );
};

const StyledContainer = styled.div`
  text-align: center;
`;

const StyledInput = styled.input`
  display: none;
  vertical-align: middle;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  word-wrap: break-word;

  &::before {
    content: "";
    border: 2px solid #dfdee2;
    display: inline-block;
    vertical-align: middle;
    width: 22px;
    height: 22px;
    margin-right: 12px;
    text-align: center;
  }
`;

const StyledFilterContent = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.brand.primary.background};
  box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
  border-radius: 2px;
  padding: 24px;
  margin-bottom: 24px;

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;

  @media ${device.desktop} {
    display: flex;
  }
`;

const StyledSearchBar = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.black100};
  height: 48px;
  padding: 12px 16px;

  line-height: 24px;
  letter-spacing: 0.15px;
  color: #a8a8a8;
  font-size: 14px;

  @media ${device.desktop} {
    width: 248px;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 142px;

  li {
    display: flex;
    align-items: center;
  }

  @media ${device.desktop} {
    width: 248px;
  }

  max-height: 244px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 4px;
    background: #fff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.black100};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
    width: 8px;
  }

  input:checked + label:before {
    content: "✓";
    background-color: ${({ theme }) => theme.brand.secondary.text};
    color: ${({ theme }) => theme.brand.accent.text};

    box-shadow: 0px 1px 7px rgba(93, 56, 192, 0.4);
  }
`;
