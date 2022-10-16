import { useSearchParams } from "react-router-dom";

export const useUrlParams = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("sort")) || 1;
  const itemType = searchParams.get("itemType");
  const sortBy = searchParams.get("sort");
  const sortDirection = searchParams.get("order");

  return {
    page,
    itemType,
    sortBy,
    sortDirection,
  };
};
