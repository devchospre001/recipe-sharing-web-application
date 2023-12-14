import { endpoints } from "@/api/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";

export function PublishRecipeDialog() {
  const { token } = useAuth();
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publishRecipe = async (event: any) => {
    event.preventDefault();

    console.log("helllo");

    const formData = new FormData(event.currentTarget);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      cuisine: formData.get("cuisine"),
      instructions: formData.get("instructions"),
      keywords: formData.get("keywords"),
      image: formData.get("image"),
    };

    try {
      await axios.post(endpoints.PUBLISH_RECIPE, data, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={publishRecipe}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" className="col-span-3" name="title" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input id="category" className="col-span-3" name="category" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cuisine" className="text-right">
            Cuisine
          </Label>
          <Input id="cuisine" className="col-span-3" name="cuisine" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="instructions" className="text-right">
            Instructions
          </Label>
          <Input id="instructions" className="col-span-3" name="instructions" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="keywords" className="text-right">
            Keywords
          </Label>
          <Input id="keywords" className="col-span-3" name="keywords" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <Input type="file" id="image" className="col-span-3" name="image" />
        </div>
      </div>
      <Button onSubmit={publishRecipe} type="submit">
        Save changes
      </Button>
    </form>
  );
}
