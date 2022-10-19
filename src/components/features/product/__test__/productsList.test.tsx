import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ItemType } from "../../../../services/serverApi";
import { renderWithProviders } from "../../../../utils/test-utils";
import { ProductsGrid } from "../ProductsGrid";

describe("products grid", async () => {
  it("should renders no cards when the list of items is empty", async () => {
    renderWithProviders(<ProductsGrid cards={[]} />);

    const result = screen.queryByTestId("product-card");

    expect(result).toBeNull();
  });

  it("should renders cards when the list of items is not empty", async () => {
    renderWithProviders(
      <ProductsGrid
        cards={[
          {
            added: 12546,
            description: "some description",
            itemType: ItemType.mug,
            manufacturer: "manufacturer",
            name: "item name",
            price: 5484,
            slug: "slug",
            tags: ["trees"],
          },
          {
            added: 122,
            description: "some description",
            itemType: ItemType.mug,
            manufacturer: "manufacturer",
            name: "item name",
            price: 5484,
            slug: "slug",
            tags: ["trees"],
          },
        ]}
      />
    );

    const result = screen.queryAllByTestId("product-card");

    expect(result).toHaveLength(2);
  });
});
