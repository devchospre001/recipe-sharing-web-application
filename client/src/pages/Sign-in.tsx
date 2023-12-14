import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

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
import { TAuthUserSignin, TErrorData } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";

export function Signin() {
  const { toast } = useToast();
  const [user, setUser] = useState<TAuthUserSignin>({
    username: "",
    password: "",
  });
  const { setTokenKey } = useAuth();
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUser((oldState) => ({ ...oldState, [id]: value } as TAuthUserSignin));
  };

  const signin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/sign-in",
        user
      );

      setTokenKey(data);
      navigate("/feed", { replace: true });

      toast({
        title: "Success",
        description: "You have been logged in successfully",
        duration: 3000,
      });
    } catch (error) {
      const requestError = error as AxiosError;
      const errorObject = requestError.response!.data as TErrorData;

      toast({
        title: "Authentication error",
        description:
          typeof errorObject.message === "string"
            ? errorObject.message
            : errorObject.message.reduce((a, b) => a + "\n" + b), // it should display one below another we'll see..
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="m-auto w-[50%]">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center justify-between text-2xl">
          Sign in
          <ModeToggle />
        </CardTitle>
        <CardDescription>
          Enter your credentials below to sign in
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
      </CardContent>
      <CardFooter>
        <Button onClick={signin} className="w-full">
          Sign in
        </Button>
        <Toaster />
      </CardFooter>
    </Card>
  );
}
