import { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner";
import { CardFeed } from "@/components/CardFeed";
import { TRecipe } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useSearch } from "@/hooks/useSearch";
import { useRecipe } from "@/hooks/useRecipe";

export const options = ["Title", "Category", "Cuisine"];

const Feed = () => {
  const { error, loading, recipes, getAllRecipes } = useRecipe();
  const [filteredRecipes, setFilteredRecipes] = useState<TRecipe[]>(recipes);
  const { inputText, handleSearchData } = useSearch();

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    const filteredRecipes = handleSearchData(recipes, options);
    setFilteredRecipes(filteredRecipes);
  }, [inputText]);

  return (
    <>
      <div>
        <h1 className="text-center text-2xl m-4">~ Feed ~</h1>
        {!inputText ? (
          !loading ? (
            recipes.length > 0 ? (
              <div className="flex flex-wrap">
                {recipes.map((recipe, i) => (
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
            ) : recipes.length === 0 && !error ? (
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
          filteredRecipes.length > 0 ? (
            <div className="flex flex-wrap">
              {filteredRecipes.map((recipe, i) => (
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
          ) : filteredRecipes.length === 0 && !error ? (
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

export default Feed;
