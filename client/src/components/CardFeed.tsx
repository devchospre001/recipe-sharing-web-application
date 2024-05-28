import { TRecipe } from "@/types";
import { Button } from "./ui/button";
import { SquareDot } from "lucide-react";
import { useRecipe } from "@/hooks/useRecipe";
import RecipeDrawer from "./modals/RecipeDrawer";

export function CardFeed(props: TRecipe) {
  const { userId, deleteRecipe, navigate } = useRecipe();

  const navigateToRecipe = (id: number) => {
    navigate(`/recipe/${id}`, { replace: false });
  };

  return (
    <div className="md:grid place-items-center">
      <div className="border flex flex-col items-center justify-center min-h-[600px] w-[400px] md:m-4 p-4">
        <img
          className="object-cover w-[100%] h-auto max-h-[250px] mb-4"
          alt={props.title}
          src={props.image}
        />
        <h1 className="text-xl mb-4">{props.title}</h1>
        <div className="border border-y-[1px] border-gray w-[100%] mb-4" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <p className="flex items-center m-2">
              <SquareDot size={"16px"} className="m-1" />
              {props.category}
            </p>
            <p className="flex items-center m-2">
              <SquareDot size={"16px"} className="m-1" />
              {props.cuisine}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-500 text-xs">PREPARATION</p>
            <p className="text-sm text-slate-300">
              {props.instructions.split(" ").slice(0, 4).join(" ")}...
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              onClick={() => navigateToRecipe(props.id!)}
              variant={"link"}
            >
              View recipe
            </Button>
            {props.userId === userId ? (
              <>
                <div className="border border-y-[1px] border-gray w-[100%] mb-4" />
                <RecipeDrawer
                  buttonTitle="Update a Recipe"
                  drawerDescription="Update a Recipe"
                  modalType="Update"
                  recipeId={props.id}
                />
                <Button
                  onClick={() => deleteRecipe(props.id!)}
                  variant={"destructive"}
                  className="w-[100%] m-1"
                >
                  Remove recipe
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
