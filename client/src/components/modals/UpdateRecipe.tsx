import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Drawer as DrawerPrimitive } from "vaul";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecipe } from "@/hooks/useRecipe";
import { FormEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type URecipe = { recipeId: string | number | undefined };

export function UpdateRecipeCard({ recipeId }: URecipe) {
  const { updateRecipe, getRecipeById, specificRecipe } = useRecipe();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const DrawerClose = DrawerPrimitive.Close;

  useEffect(() => {
    getRecipeById(parseInt(recipeId as string));
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    try {
      await updateRecipe(formData, parseInt(recipeId as string));
      navigate(`recipe/${recipeId}`, { replace: false });
    } catch (error) {
      console.error("There has been an error while publishing recipe.");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder={specificRecipe.title}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder={specificRecipe.category}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Input
                id="cuisine"
                name="cuisine"
                placeholder={specificRecipe.cuisine}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instructions">Instructions</Label>
              <Input
                id="instructions"
                name="instructions"
                placeholder={specificRecipe.instructions}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input name="image" type="file" />
            </div>
            <div className="border border-y-[1px] border-gray w-[100%] mb-4" />
            <div className="flex flex-col items-center justify-center grow">
              <Button
                className="w-[100%]"
                onClick={handleSubmit}
                variant={"secondary"}
              >
                Update Recipe
              </Button>
              <DrawerClose className="w-[100%] m-2">
                <Button className="w-[100%]" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
