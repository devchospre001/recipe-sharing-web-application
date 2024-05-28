import { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner";
import { CardFeed } from "@/components/CardFeed";
import { TRecipe } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { NavMenu } from "@/components/NavMenu";
import { useSearch } from "@/hooks/useSearch";
import { useRecipe } from "@/hooks/useRecipe";
import { options } from "./Feed";

const MyRecipes = () => {
  const { myRecipes, getRecipesForUser, loading, error } = useRecipe();
  const [myFilteredRecipes, setMyFilteredRecipes] =
    useState<TRecipe[]>(myRecipes);
  const { handleSearchData, inputText } = useSearch();

  useEffect(() => {
    getRecipesForUser();
  }, []);

  useEffect(() => {
    const filteredRecipes = handleSearchData(myRecipes, options);
    setMyFilteredRecipes(filteredRecipes);
  }, [inputText]);

  return (
    <>
      <NavMenu />
      <div className="grid md:place-content-center">
        <h1 className="text-center text-2xl m-4">~ My Feed ~</h1>
        {!inputText ? (
          !loading ? (
            myRecipes.length > 0 ? (
              <div className="grid place-content-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {myRecipes.map((recipe, i) => (
                  <CardFeed
                    key={(Math.random() * i + 1024) ** 2}
                    title={recipe.title}
                    category={recipe.category}
                    cuisine={recipe.cuisine}
                    instructions={recipe.instructions}
                    keywords={recipe.keywords}
                    image={recipe.image}
                    userId={recipe.userId}
                    id={recipe.id}
                  />
                ))}
              </div>
            ) : myRecipes.length === 0 && !error ? (
              <div className="text-center">
                There are no recipes published at this moment
              </div>
            ) : error ? (
              <div className="text-center">
                There are no recipes at this moment
                <Toaster />
              </div>
            ) : null
          ) : (
            <Spinner />
          )
        ) : !loading ? (
          myFilteredRecipes.length > 0 ? (
            <div className="grid place-content-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {myFilteredRecipes.map((recipe, i) => (
                <CardFeed
                  key={(Math.random() * i + 1024) ** 2}
                  title={recipe.title}
                  category={recipe.category}
                  cuisine={recipe.cuisine}
                  instructions={recipe.instructions}
                  keywords={recipe.keywords}
                  image={recipe.image}
                  userId={recipe.userId}
                  id={recipe.id}
                />
              ))}
            </div>
          ) : myFilteredRecipes.length === 0 && !error ? (
            <h1 className="text-center">
              There are no recipes with that keyword
            </h1>
          ) : error ? (
            <div className="text-center">
              There are no recipes at this moment
              <Toaster />
            </div>
          ) : null
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default MyRecipes;
