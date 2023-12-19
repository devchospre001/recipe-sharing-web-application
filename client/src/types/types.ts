import { PropsWithChildren, ReactNode } from "react";

export type TRecipe = {
  title: string;
  category: string;
  cuisine: string;
  instructions: string;
  keywords: Array<string>;
  image: string | undefined;
};

export type TUser = {
  username: string;
  password: string;
};

export type TAuthUserSignin = TUser;

export type TAuthUserSignup = TUser & {
  email?: string | undefined | null;
  firstName?: string | undefined | null;
  lastName?: string | undefined | null;
};

export type TError = {
  statusText: string;
  message: string;
};

export type TChildProps = {
  children: PropsWithChildren<ReactNode>;
};

export type TAuthContext = {
  token: string | null;
  setTokenKey: (newToken: string) => void;
};

export type TRecipeContext = {
  recipe: TRecipe;
  recipes: TRecipe[];
  setRecipe: (object: TRecipe) => void;
  setRecipes: (array: TRecipe[]) => void;
  getAllRecipes: () => Promise<TRecipe[]>;
  getRecipesForUser: (recipeId: number) => Promise<void>;
  publishRecipe: (recipe: TRecipe) => Promise<void>;
  updateRecipe: (recipe: TRecipe, recipeId: number) => Promise<void>;
  deleteRecipe: (recipeId: number) => Promise<void>;
};

export type TUpdateRecipe = Partial<TRecipe>;

export type TNavContext = {
  isDialogShown: boolean;
  setIsDialogShown: (newValue: boolean) => void;
};

export type TErrorData = {
  error: string;
  message: string | string[];
  statusCode: number;
};

export type TListNavProps = {
  title: string | undefined;
  children: ReactNode;
  ref: React.ForwardedRef<HTMLAnchorElement>;
};