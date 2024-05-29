import { FormEvent, useRef } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useRecipe } from "@/hooks/useRecipe";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function CreateRecipeCard() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const { publishRecipe } = useRecipe();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    try {
      await publishRecipe(formData);
      navigate("/", { replace: false });
    } catch (error) {
      console.error("There has been an error while publishing recipe.");
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center">
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
            <div className="border border-y-[1px] border-gray w-[100%] mb-4" />
            <div className="flex flex-col items-center justify-center grow">
              <Button
                className="w-[100%]"
                onSubmit={handleSubmit}
                variant={"secondary"}
              >
                Publish Recipe
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
