export const endpoints = {
  FETCH_ALL_RECIPES: `/recipes`,
  FETCH_RECIPES_FROM_USER: `/recipes/my-recipes`,
  FETCH_RECIPE_BY_ID: `/recipes/recipe`,
  PUBLISH_RECIPE: `/recipes/recipe/new`,
  UPDATE_RECIPE: `/recipes/recipe`, // ID should be provided
  DELETE_RECIPE: `/recipes/recipe`, // ID should be provided
  GET_USER: `/user/currentLoggedInUser`,
};
