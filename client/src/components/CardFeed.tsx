import { TRecipe } from "@/types";
import { Button } from "./ui/button";
import { SquareDot } from "lucide-react";
import { useRecipe } from "@/hooks/useRecipe";

export function CardFeed(props: TRecipe) {
  const { userId } = useRecipe();
  return (
    <div className="flex basis-1/3 items-center justify-center">
      <div className="border flex flex-col items-center justify-center w-[400px] m-4 p-4">
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
            <Button variant={"link"}>View recipe</Button>
            {props.userId === userId ? (
              <>
                <div className="border border-y-[1px] border-gray w-[100%] mb-4" />
                <Button variant={"destructive"}>Remove recipe</Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
