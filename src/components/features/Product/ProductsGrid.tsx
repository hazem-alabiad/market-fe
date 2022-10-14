import styled from "styled-components";

import { useAppDispatch } from "../../../redux/store";
import { Product } from "../../../services/productsApi";
import { addToCart } from "../Header/subComponents/ShoppingCart/shoppingCartSlice";
import { ProductCard } from "./ProductCard";

type Props = {
  cards: Array<Product>;
};

export const ProductsGrid = ({ cards }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <StyledGrid>
      {cards.map((item, index) => (
        <ProductCard
          image={`https://picsum.photos/200?random=${index}.webp`}
          key={item.added}
          name={item.name}
          onClick={() => dispatch(addToCart(item))}
          price={item.price}
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
