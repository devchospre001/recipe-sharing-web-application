import * as React from "react";
import { Crown, Filter, MenuIcon, Search, SquareUser } from "lucide-react";
import { Label } from "@radix-ui/react-label";

import RecipeDrawer from "./modals/RecipeDrawer";
import MenuItem from "./MobileMenu";
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
import { useSearch } from "@/hooks/useSearch";
import { Switch } from "./ui/switch";
import { options } from "@/pages/Feed";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";

const components: {
  title: string;
  href?: string;
  description: string;
}[] = [
  {
    title: "My profile",
    href: "/my-profile",
    description: 'View "Profile" link and adjust your profile settings',
  },
];

export function NavMenu() {
  const { user } = useUser();
  const { setTokenKey } = useAuth();
  const { handleSearchInput, checkedTag, handleTagCheck } = useSearch();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);

  return (
    <>
      <div className="hidden lg:flex items-center justify-center max-w-[100%]">
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
                        className="flex h-full w-[150px] select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/my-profile"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          <Crown color="gold" size={"64px"} />
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Welcome{" "}
                          <strong>
                            {!user.firstName ? user.username : user.firstName}!
                          </strong>
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    key={Math.random() ** 2 * 1024}
                    title="Feed"
                    href="/"
                  >
                    By clicking on "Feed" link you can see all recipes from
                    users
                  </ListItem>
                  <ListItem
                    key={Math.random() ** 2 * 1024}
                    title="My Recipes"
                    href="/my-recipes"
                  >
                    By viewing "My Recipes" link you can see all of your recipes
                  </ListItem>
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
                    Log out from current session
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
        <div>
          <RecipeDrawer
            buttonTitle="Publish a Recipe"
            modalType="Publish"
            drawerDescription="Publish a Recipe"
          />
        </div>
      </div>
      <div className="flex items-center m-5 lg:hidden">
        <Button onClick={() => setIsOpenMenu(!isOpenMenu)} variant={"ghost"}>
          <MenuIcon />
        </Button>
        <div className="relative">
          <ul
            className={
              !isOpenMenu ? "hidden" : "flex flex-col w-max absolute z-3"
            }
          >
            <MenuItem tag={<ModeToggle />} />
            <MenuItem
              tag={
                <Button className="w-full" variant={"outline"}>
                  <a href="/">Feed</a>
                </Button>
              }
            />
            <MenuItem
              tag={
                <Button className="w-full" variant={"outline"}>
                  <a href="/my-recipes">My Recipes</a>
                </Button>
              }
            />
            <MenuItem
              tag={
                <Button className="w-full" variant={"outline"}>
                  <a href="/my-profile">Profile</a>
                </Button>
              }
            />
            <MenuItem
              tag={
                <RecipeDrawer
                  buttonTitle="Publish a Recipe"
                  drawerDescription="Publish a Recipe"
                  modalType="Publish"
                />
              }
            />
            <MenuItem
              tag={
                <Button className="w-full" variant={"outline"}>
                  <a href="/" onClick={() => setTokenKey("")}>
                    Logout
                  </a>
                </Button>
              }
            />
          </ul>
        </div>
        <Button
          onClick={() => setIsOpenSearch(!isOpenSearch)}
          variant={"ghost"}
          className="mr-5"
        >
          <Search />
        </Button>
        <Input
          type="search"
          className={
            isOpenSearch
              ? "flex items-center justify-center w-[100%] sm:hidden"
              : "hidden"
          }
          onChange={handleSearchInput}
        />
        <Input
          type="search"
          className={
            isOpenSearch
              ? "hidden md:flex items-center justify-center w-[100%]"
              : "hidden"
          }
          onChange={handleSearchInput}
        />
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
