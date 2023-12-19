import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import Spinner from "@/components/ui/spinner";
import { CardFeed } from "@/components/card-feed";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { TRecipe } from "@/types";
import { endpoints } from "@/api/config";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [error, setError] = useState<AxiosError>();
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get<TRecipe[]>(endpoints.FETCH_ALL_RECIPES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((_error) => {
        const axiosError = _error as AxiosError;
        setError(axiosError);
        setLoading(false);
        toast({
          title: `Error ${error?.response?.status}`,
          description: error?.message,
          variant: "destructive",
        });
      });
  }, []);

  return (
    <Card className="grid grid-rows-1 items-center justify-center m-auto w-[50%]">
      <CardHeader className="flex items-center">~ Feed ~</CardHeader>
      <CardContent>
        {!loading ? (
          recipes.length > 0 ? (
            recipes.map((recipe, i) => (
              <CardFeed
                key={(Math.random() * i + 1024) ** 2}
                title={recipe.title}
                category={recipe.category}
                cuisine={recipe.cuisine}
                instructions={recipe.instructions}
                keywords={recipe.keywords}
                image={recipe.image}
              />
            ))
          ) : recipes.length === 0 && !error ? (
            <Button variant="ghost">
              There are no recipes published at the moment
            </Button>
          ) : error ? (
            <div>
              <Button className="w-[40rem]" variant="destructive">
                Error while fetching recipes
              </Button>
              <Toaster />
            </div>
          ) : null
        ) : (
          <Spinner />
        )}
      </CardContent>
    </Card>
  );
};

export default Feed;
