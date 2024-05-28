import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

import { TChildProps, TRecipe, TRecipeContext, TUpdateRecipe } from "@/types";
import { endpoints } from "@/api/config";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const RecipeContext = createContext<TRecipeContext>(
  {} as TRecipeContext
);

const RecipeContextProvider = ({ children }: TChildProps) => {
  const { Provider } = RecipeContext;
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<TRecipe[]>([]);
  const [recipe, setRecipe] = useState<TRecipe>({} as TRecipe);
  const [specificRecipe, setSpecificRecipe] = useState<TRecipe>({} as TRecipe);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined | null>(null);
  const { token } = useAuth();
  const authToken = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const navigate = useNavigate();

  const getAllRecipes = async () => {
    try {
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

  const getRecipeById = async (recipeId: number) => {
    try {
      const response = await axios.get<TRecipe>(
        `${endpoints.FETCH_RECIPE_BY_ID}/${recipeId}`,
        authToken
      );

      const data = response.data;

      setSpecificRecipe(data);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
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
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const updateRecipe = async (data: FormData, recipeId: number) => {
    try {
      await axios.patch<TUpdateRecipe>(
        `${endpoints.UPDATE_RECIPE}/${recipeId}`,
        data,
        authToken
      );
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const deleteRecipe = async (recipeId: number) => {
    try {
      await axios.delete<number>(
        `${endpoints.DELETE_RECIPE}/${recipeId}`,
        authToken
      );
      navigate(0);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
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
    specificRecipe,
    userId,
    navigate,
    setRecipe,
    setRecipes,
    setMyRecipes,
    getAllRecipes,
    getRecipesForUser,
    getRecipeById,
    publishRecipe,
    updateRecipe,
    deleteRecipe,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default RecipeContextProvider;
