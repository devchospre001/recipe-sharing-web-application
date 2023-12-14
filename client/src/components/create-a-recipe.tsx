import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export function CreateRecipeCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a recipe</CardTitle>
        <CardDescription>Publish your new recipe in one-click</CardDescription>
      </CardHeader>
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
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Publish</Button>
      </CardFooter>
    </Card>
  );
}
