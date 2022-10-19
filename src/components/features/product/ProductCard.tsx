import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { Product } from "../../../services/serverApi";
import { Button } from "../../ui/Button";
import { Price } from "../../ui/Price";

export const ProductCard = ({
  image,
  placeholder = "https://via.placeholder.com/200",
  name,
  price,
  onClick,
}: Pick<Product, "name" | "price"> & {
  onClick: () => void;
  image: string;
  placeholder?: string;
}) => (
  <article data-testid="product-card">
    <StyledImgWrapper>
      <img
        alt="product image"
        placeholder={placeholder}
        src={image}
        width="100%"
      />
    </StyledImgWrapper>
    <StyledPrice>
      <Price theme="secondary" value={price} />
    </StyledPrice>
    <StyledName>{name}</StyledName>
    <StyledButtonWrapper>
      <Button
        height="22px"
        isFullWidth={true}
        label={<FormattedMessage defaultMessage="Add" id="2/2yg+" />}
        onClick={onClick}
      />
    </StyledButtonWrapper>
  </article>
);

const StyledImgWrapper = styled.div`
  width: 124px;
  height: 124px;
  padding: 16px;
  border: 1.17666px solid #f3f0fe;
  border-radius: 12px;
`;

const StyledName = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  height: 40px;
`;

const StyledPrice = styled.div`
  padding-top: 9px;
`;

const StyledButtonWrapper = styled.div`
  height: 22px;
`;
