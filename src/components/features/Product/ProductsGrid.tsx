import styled from "styled-components";

import { Product } from "../../../services/productsApi";
import { useShoppingCart } from "../Header/subComponents/ShoppingCart/useShoppingCart";
import { ProductCard } from "./ProductCard";

type Props = {
  cards: Array<Product>;
};

export const ProductsGrid = ({ cards }: Props) => {
  const { addItem } = useShoppingCart();

  return (
    <StyledGrid>
      {cards.map(({ added, name, price }, index) => (
        <ProductCard
          image={`https://picsum.photos/200?random=${index}.webp`}
          key={added}
          name={name}
          onClick={() => addItem({ added, name, price })}
          price={price}
        />
      ))}
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 124px);
  grid-gap: 24px;
  grid-auto-rows: auto;
  place-content: center;
`;
