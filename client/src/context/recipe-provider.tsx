// import axios from "axios";
// import { createContext, useMemo, useState } from "react";

// import { TChildProps, TRecipe, TRecipeContext, TUpdateRecipe } from "@/types";
// import { endpoints } from "@/api/config";

// export const RecipeContext = createContext<TRecipeContext>(
//   {} as TRecipeContext
// );

// const RecipeContextProvider = ({ children }: TChildProps) => {
//   const { Provider } = RecipeContext;
//   const [recipes, setRecipes] = useState<TRecipe[]>([]);
//   const [recipe, setRecipe] = useState<TRecipe>({} as TRecipe);
//   const token = localStorage.getItem("token");
//   const authToken = {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   };

//   const getAllRecipes = async () => {
//     try {
//       const response = await axios.get<TRecipe[]>(
//         endpoints.FETCH_ALL_RECIPES,
//         authToken
//       );
//       const data = response.data;

//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getRecipesForUser = async (recipeId: number) => {
//     try {
//       const response = await axios.get<TRecipe>(
//         endpoints.FETCH_RECIPES_FROM_USER + `/${recipeId}`,
//         authToken
//       );
//       const data = response.data;
//       setRecipe(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const publishRecipe = async (recipe: TRecipe) => {
//     try {
//       await axios.post<TRecipe>(endpoints.PUBLISH_RECIPE, recipe, authToken);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateRecipe = async (recipe: TUpdateRecipe, recipeId: number) => {
//     try {
//       await axios.patch<TUpdateRecipe>(
//         endpoints.UPDATE_RECIPE + `/${recipeId}`,
//         recipe,
//         authToken
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteRecipe = async (recipeId: number) => {
//     try {
//       await axios.delete<number>(
//         endpoints.DELETE_RECIPE + `/${recipeId}`,
//         authToken
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   useEffect(() => {
//   //     // axios.interceptors.response.use((response) => {
//   //     //     if (response.status === 401)
//   //     // }); TODO: Add this to auth provider.

//   //   }, []);

//   const contextValue = useMemo(
//     () => ({
//       recipe,
//       recipes,
//       setRecipe,
//       setRecipes,
//       getAllRecipes,
//       getRecipesForUser,
//       publishRecipe,
//       updateRecipe,
//       deleteRecipe,
//     }),
//     []
//   );

//   return <Provider value={contextValue}>{children}</Provider>;
// };

// export default RecipeContextProvider;
