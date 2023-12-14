import { ChangeEvent, useState } from "react";
import axios from "axios";

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
import { useToast } from "@/components/ui/use-toast";
import { TAuthUserSignup } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Signup() {
  const { toast } = useToast();
  const [user, setUser] = useState<TAuthUserSignup>({
    username: "",
    password: "",
    email: null,
    firstName: null,
    lastName: null,
  });
  const { setTokenKey } = useAuth();
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUser((oldState) => ({ ...oldState, [id]: value } as TAuthUserSignup));
  };

  const signup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/sign-up",
        user
      );
      toast({
        title: "Success",
        description: "You have successfully created an account",
      });
      setTokenKey(data);
      navigate("/feed", { replace: true });
    } catch (error) {
      toast({
        title: "Add an error name",
        description: "Add an error description",
      });
    }
  };

  return (
    <Card className="m-auto w-[50%]">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center justify-between text-2xl">
          Create an account
          <ModeToggle />
        </CardTitle>
        <CardDescription>
          Enter your credentials below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            type="text"
            value={user.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={user.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={onChange}
            value={user.email as string | undefined}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={user.firstName as string}
            onChange={onChange}
            type="text"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="firstName">Last name</Label>
          <Input
            id="lastName"
            type="text"
            value={user.lastName as string}
            onChange={onChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => signup()} className="w-full">
          Create account
        </Button>
        <Toaster />
      </CardFooter>
    </Card>
  );
}
