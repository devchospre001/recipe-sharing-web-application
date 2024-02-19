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
      <div>
        <h1 className="text-center text-2xl m-4">~ Feed ~</h1>
        {!inputText ? (
          !loading ? (
            myRecipes.length > 0 ? (
              <div className="flex flex-wrap">
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
                  />
                ))}
              </div>
            ) : myRecipes.length === 0 && !error ? (
              <>There are no recipes published at this moment</>
            ) : error ? (
              <div>
                There are no recipes at this moment
                <Toaster />
              </div>
            ) : null
          ) : (
            <Spinner />
          )
        ) : !loading ? (
          myFilteredRecipes.length > 0 ? (
            <div className="flex flex-wrap">
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
