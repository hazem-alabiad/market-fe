import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "../utils/routes";
import { HomePage } from "./features/HomePage";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES["/"],
      element: <HomePage />,
    },
    {
      path: ROUTES.items,
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
