import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRecipe } from "@/types";
import { Blocks, WholeWord, ChefHat } from "lucide-react";

export function CardFeed(props: TRecipe) {
  return (
    <Card className="w-[100%] m-auto">
      <CardHeader>
        <div className="flex flex-col items-center space-y-1">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.instructions}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-[600px] h-[400px] object-fit m-auto space-x-4 text-sm text-muted-foreground mb-3">
          <img width={600} height={1} src={props.image} />
        </div>
        <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row justify-center items-center space-x-4 xl:flex-row text-sm text-muted-foreground">
          <div className="flex items-center">
            <Blocks className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {props.category}
          </div>
          <div className="flex items-center">
            <ChefHat className="mr-1 h-3 w-3" />
            {props.cuisine}
          </div>
          <div className="flex items-center">
            <WholeWord className="mr-1 h-3 w-3" />
            {props.keywords}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
