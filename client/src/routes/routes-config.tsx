import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routePaths from "./routes";
import ProtectedRoute from "./protected-route";
import App from "../App";
import ErrorPage from "../pages/Error";
import { Signin } from "../pages/Sign-in";
import { Signup } from "../pages/Sign-up";
import { useAuth } from "../hooks/useAuth";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedUsersOnly = [
    {
      path: routePaths.BASE,
      element: <ProtectedRoute />,
      children: [
        {
          path: routePaths.BASE,
          element: <App />,
        },
        {
          path: routePaths.FEED,
          element: <App />,
        },
        {
          path: routePaths.MY_PROFILE,
          element: <div>Profile</div>,
        },
        {
          path: routePaths.SETTINGS,
          element: <div>Settings</div>,
        },
        {
          path: routePaths.MY_RECIPES,
          element: <div>My Recipes</div>,
        },
      ],
    },
  ];

  const routesForNonAuthenticatedUsersOnly = [
    {
      path: routePaths.BASE,
      element: <Signin />,
    },
    {
      path: routePaths.SIGNIN,
      element: <Signin />,
    },
    {
      path: routePaths.SIGNUP,
      element: <Signup />,
    },
    {
      path: routePaths.UNKNOWN,
      element: <ErrorPage />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNonAuthenticatedUsersOnly : []),
    ...routesForAuthenticatedUsersOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
