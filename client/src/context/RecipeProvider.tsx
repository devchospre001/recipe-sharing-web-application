import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

import { TChildProps, TRecipe, TRecipeContext, TUpdateRecipe } from "@/types";
import { endpoints } from "@/api/config";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const RecipeContext = createContext<TRecipeContext>(
  {} as TRecipeContext
);

const RecipeContextProvider = ({ children }: TChildProps) => {
  const { Provider } = RecipeContext;
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<TRecipe[]>([]);
  const [recipe, setRecipe] = useState<TRecipe>({} as TRecipe);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [userId, setUserId] = useState<string | undefined | null>(null);
  const authToken = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getAllRecipes = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await axios.get<TRecipe[]>(
        endpoints.FETCH_ALL_RECIPES,
        authToken
      );
      const data = response.data;

      setRecipes(data);
      setLoading(false);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      setLoading(false);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const getRecipesForUser = async () => {
    try {
      const response = await axios.get<TRecipe[]>(
        endpoints.FETCH_RECIPES_FROM_USER,
        authToken
      );
      const data = response.data;

      setMyRecipes(data);
      setLoading(false);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      setLoading(false);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const publishRecipe = async (formData: FormData) => {
    try {
      await axios.post<TRecipe>(endpoints.PUBLISH_RECIPE, formData, authToken);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecipe = async (recipe: TUpdateRecipe, recipeId: number) => {
    try {
      await axios.patch<TUpdateRecipe>(
        endpoints.UPDATE_RECIPE + `/${recipeId}`,
        recipe,
        authToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async (recipeId: number) => {
    try {
      await axios.delete<number>(
        endpoints.DELETE_RECIPE + `/${recipeId}`,
        authToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const decodedToken = jwtDecode(token!);
    setUserId(decodedToken.sub);
  }, []);

  const contextValue = {
    error,
    loading,
    recipe,
    recipes,
    myRecipes,
    userId,
    setRecipe,
    setRecipes,
    setMyRecipes,
    getAllRecipes,
    getRecipesForUser,
    publishRecipe,
    updateRecipe,
    deleteRecipe,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default RecipeContextProvider;
