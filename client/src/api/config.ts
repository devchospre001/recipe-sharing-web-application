export const serverUrl = process.env.SERVER_URL;

export const endpoints = {
  FETCH_ALL_RECIPES: `${serverUrl}/recipes`,
  FETCH_RECIPES_FROM_USER: `${serverUrl}/recipes/my-recipes`,
  FETCH_RECIPE_BY_ID: `${serverUrl}/recipes/recipe`,
  PUBLISH_RECIPE: `${serverUrl}/recipes/recipe/new`,
  UPDATE_RECIPE: `${serverUrl}/recipes/recipe`, // ID should be provided
  DELETE_RECIPE: `${serverUrl}/recipes/recipe`, // ID should be provided
  GET_USER: `${serverUrl}/user/currentLoggedInUser`,
};
