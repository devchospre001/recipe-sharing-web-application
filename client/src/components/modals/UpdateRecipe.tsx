import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UpdateRecipeCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader></CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input id="name" placeholder="Title of your recipe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Category</Label>
              <Input
                id="name"
                placeholder="Category of your recipe"
                defaultValue="Uncategorized"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Cuisine</Label>
              <Input
                id="name"
                placeholder="From which cuisine your recipe comes"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Instructions</Label>
              <Input id="name" placeholder="Instructions to make this recipe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Keywords</Label>
              <Input id="name" placeholder="Keywords" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Image (Optional)</Label>
              <Input id="name" type="file" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
