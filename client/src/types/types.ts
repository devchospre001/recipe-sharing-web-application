import { AxiosError } from "axios";
import { PropsWithChildren, ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

export type TRecipe = {
  id?: number;
  title: string;
  category: string;
  cuisine: string;
  instructions: string;
  keywords: Array<string>;
  image: string | undefined;
  userId?: number;
  path?: string | undefined;
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

// user for context api
export type TUserCTX = Required<TAuthUserSignup> & { id: number };

export type TUserContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<unknown, any> | undefined;
  user: TUserCTX;
  setUser: React.Dispatch<React.SetStateAction<TUserCTX>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: (user: any) => Promise<void>;
};

export type TError = {
  status: number;
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
  loading: boolean;
  userId: string | undefined | null;
  navigate: NavigateFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<unknown, any> | undefined;
  recipe: TRecipe;
  recipes: TRecipe[];
  specificRecipe: TRecipe;
  myRecipes: TRecipe[];
  setRecipe: (object: TRecipe) => void;
  setRecipes: (array: TRecipe[]) => void;
  setMyRecipes: (array: TRecipe[]) => void;
  getAllRecipes: () => Promise<void>;
  getRecipesForUser: () => Promise<void>;
  getRecipeById: (recipeId: number) => Promise<void>;
  publishRecipe: (formData: FormData) => Promise<void>;
  updateRecipe: (data: FormData, recipeId: number) => Promise<void>;
  deleteRecipe: (recipeId: number) => Promise<void>;
};

export type TUpdateRecipe = Partial<TRecipe>;

export type TRecipeDrawerTitle = "Publish a Recipe" | "Update a Recipe";
export type TRecipeModalType = "Publish" | "Update";

export type TRecipeDrawer = {
  buttonTitle: TRecipeDrawerTitle;
  drawerDescription: TRecipeDrawerTitle;
  modalType: TRecipeModalType;
  recipeId?: string | number;
};

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
