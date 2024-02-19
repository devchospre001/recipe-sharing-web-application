import * as React from "react";
import { jwtDecode } from "jwt-decode";
import { Filter, MenuIcon, SquareUser } from "lucide-react";
import { Label } from "@radix-ui/react-label";

import { cn } from "@/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import RecipeDrawer from "./modals/RecipeDrawer";
import { useSearch } from "@/hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { options } from "@/pages/Feed";
import { ModeToggle } from "./ModeToggle";

const components: {
  title: string;
  href?: string;
  description: string;
}[] = [
  {
    title: "My recipes",
    href: "/my-recipes",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "My profile",
    href: "/my-profile",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Settings",
    href: "/settings",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
];

export function NavMenu() {
  const { token, setTokenKey } = useAuth();
  const { handleSearchInput, checkedTag, handleTagCheck } = useSearch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = jwtDecode(token!) as any;
  const navigate = useNavigate();

  const navigateToFeed = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center justify-center">
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="items-start justify-start w-[100%] m-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <MenuIcon size={"16px"} className="m-2" />
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {user.username}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Welcome to Recipes, {user.username.toUpperCase()}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button onClick={navigateToFeed} variant="outline">
                        Recipe Feed
                      </Button>
                    </DrawerTrigger>
                  </Drawer>
                  <RecipeDrawer
                    buttonTitle="Publish a Recipe"
                    drawerDescription="Publish a Recipe"
                    modalType="Publish"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <SquareUser size={"16px"} className="m-2" />
                Profile
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                  <ListItem
                    key={Math.random() * 1024 ** 2}
                    title="Logout"
                    href="/"
                    onClick={() => setTokenKey("")}
                  >
                    Log out from this account in just one click
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Input
          type="search"
          className="flex items-center justify-center w-[400px]"
          onChange={handleSearchInput}
        />
        <NavigationMenu className="m-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Filter className="m-2" size={"16px"} />
                Filter
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {options.map((option, idx) => (
                    <div className="flex items-center space-x-2 w-max">
                      <Switch
                        id={option.toLowerCase() + "-mode"}
                        onCheckedChange={() => handleTagCheck(idx)}
                        checked={idx === checkedTag}
                      />
                      <Label htmlFor="title-mode">Search by {option}</Label>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
