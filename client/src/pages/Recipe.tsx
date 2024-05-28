import { NavMenu } from "@/components/NavMenu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecipe } from "@/hooks/useRecipe";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const { specificRecipe, getRecipeById, navigate } = useRecipe();

  useEffect(() => {
    getRecipeById(parseInt(id!));
  }, []);

  return (
    <>
      <NavMenu />
      <div className="mt-5">
        <Card className="flex flex-col items-center justify-center w-[600px] m-auto">
          <img
            src={specificRecipe.image}
            alt={specificRecipe.title}
            className="object-cover w-[100%] h-auto max-h-[250px] mb-4"
          />
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle>{specificRecipe.title}</CardTitle>
            <CardDescription>{specificRecipe.keywords}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <i className="text-sm text-slate-300">PREPARATION</i>
            <h1 className="break-all">{specificRecipe.instructions} </h1>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-center">
            <footer className="m-2 text-sm text-slate-300">
              {specificRecipe.category}
            </footer>
            <footer className="m-2 text-sm text-slate-300">
              {specificRecipe.cuisine}
            </footer>
          </CardFooter>
          <Button
            onClick={() => navigate(-1)}
            className="flex self-center"
            variant={"link"}
          >
            Back
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Recipe;
