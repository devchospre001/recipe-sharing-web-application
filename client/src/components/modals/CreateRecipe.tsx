import { Drawer as DrawerPrimitive } from "vaul";
import { useRef } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useRecipe } from "@/hooks/useRecipe";

export function CreateRecipeCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<HTMLFormElement | any>();
  const { publishRecipe } = useRecipe();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await publishRecipe(formData);
    } catch (error) {
      console.log(error);
    }
  };
  const DrawerClose = DrawerPrimitive.Close;

  return (
    <Card className="w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                placeholder="Title of your recipe"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                name="category"
                id="category"
                placeholder="Category of your recipe"
                defaultValue="Uncategorized"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Input
                name="cuisine"
                id="cuisine"
                placeholder="From which cuisine your recipe comes"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instructions">Instructions</Label>
              <Input
                name="instructions"
                id="instructions"
                placeholder="Instructions to make this recipe"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="keywords">Keywords</Label>
              <Input name="keywords" id="keywords" placeholder="Keywords" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input name="image" id="image" type="file" />
            </div>
            <div className="flex flex-col items-center justify-center grow">
              <Button onSubmit={handleSubmit} variant={"secondary"}>
                Publish Recipe
              </Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
