import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routePaths from "@/routes/routes";
import ProtectedRoute from "@/routes/protected-route";
import App from "@/App";
import ErrorPage from "@/pages/Error";
import MyRecipes from "@/pages/MyRecipes";
import MyProfile from "@/pages/MyProfile";
import RecipeContextProvider from "@/context/RecipeProvider";
import SearchContextProvider from "@/context/SearchProvider";
import Recipe from "@/pages/Recipe";
import UserContextProvider from "@/context/UserProvider";
import { Signin } from "@/pages/Sign-in";
import { Signup } from "@/pages/Sign-up";
import { useAuth } from "@/hooks/useAuth";
import { Settings } from "@/pages/Settings";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedUsersOnly = [
    {
      path: routePaths.BASE,
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: routePaths.BASE,
          element: (
            <SearchContextProvider>
              <RecipeContextProvider>
                <App />
              </RecipeContextProvider>
            </SearchContextProvider>
          ),
        },
        {
          path: routePaths.MY_PROFILE,
          element: (
            <RecipeContextProvider>
              <UserContextProvider>
                <MyProfile />
              </UserContextProvider>
            </RecipeContextProvider>
          ),
        },
        {
          path: routePaths.SETTINGS,
          element: <Settings />,
        },
        {
          path: routePaths.MY_RECIPES,
          element: (
            <SearchContextProvider>
              <RecipeContextProvider>
                <MyRecipes />
              </RecipeContextProvider>
            </SearchContextProvider>
          ),
        },
        {
          path: routePaths.RECIPE,
          element: (
            <RecipeContextProvider>
              <Recipe />
            </RecipeContextProvider>
          ),
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
