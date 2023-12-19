import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/nav-menu";

export function Settings() {
  return (
    <>
      <NavMenu />
      <div className="flex h-[100vh]">
        <Card className="m-auto w-[50%]">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center justify-between text-2xl">
              Settings
              <ModeToggle />
            </CardTitle>
            <CardDescription>
              You can edit your settings/preferences here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" type="text" name="firstName" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Last name</Label>
                <Input id="lastName" type="text" name="lastName" />
              </div>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </form>
          </CardContent>
          <CardFooter>Put something in card footer</CardFooter>
        </Card>
      </div>
    </>
  );
}
