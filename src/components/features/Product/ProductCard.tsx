import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { Button } from "../../ui/Button";
import { Price } from "../../ui/Price";
import { Product } from "../HomePage";

export const ProductCard = ({
  image,
  name,
  price,
  onClick,
}: Pick<Product, "image" | "name" | "price"> & { onClick: () => void }) => (
  <div>
    <StyledImgWrapper>
      <img src={image} width="100%" />
    </StyledImgWrapper>
    <StyledPrice>
      <Price theme="secondary" value={price} />
    </StyledPrice>
    <StyledName>{name}</StyledName>
    <Button
      label={<FormattedMessage defaultMessage="Add" id="2/2yg+" />}
      onClick={onClick}
    />
  </div>
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
