export const endpoints = {
  FETCH_ALL_RECIPES: "http://localhost:3000/recipes",
  FETCH_RECIPES_FROM_USER: "http://localhost:3000/recipes/my-recipes", // ID should be provided
  PUBLISH_RECIPE: "http://localhost:3000/recipes/recipe/new",
  UPDATE_RECIPE: "http://localhost:3000/recipes/recipe", // ID should be provided
  DELETE_RECIPE: "http://localhost:3000/recipes/recipe", // ID should be provided
  GET_USER: "http://localhost:3000/user/currentLoggedInUser",
};
