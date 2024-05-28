import { useContext } from "react";
import { RecipeContext } from "@/context/RecipeProvider";

export const useRecipe = () => useContext(RecipeContext);
