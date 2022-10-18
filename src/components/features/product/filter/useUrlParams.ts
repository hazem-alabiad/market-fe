import { useLocation, useSearchParams } from "react-router-dom";

import { ROUTES } from "../../../../utils/routes";

export const useUrlParams = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const page = Number(searchParams.get("page")) || 1;

  return {
    page,
    pathname: pathname === ROUTES["/"] ? ROUTES.items : pathname,
  };
};
