import { TRecipeDrawer } from "@/types";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { CreateRecipeCard } from "./CreateRecipe";
import { UpdateRecipeCard } from "./UpdateRecipe";
import RecipeContextProvider from "@/context/RecipeProvider";

const RecipeDrawer = (props: TRecipeDrawer) => {
  return (
    <RecipeContextProvider>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">{props.buttonTitle}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Be a Chef!</DrawerTitle>
              <DrawerDescription>{props.drawerDescription}</DrawerDescription>
            </DrawerHeader>
            {props.modalType === "Publish" ? (
              <CreateRecipeCard />
            ) : (
              <UpdateRecipeCard />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </RecipeContextProvider>
  );
};

export default RecipeDrawer;
