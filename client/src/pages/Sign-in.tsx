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
import { TErrorData } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { FieldValues, useForm } from "react-hook-form";

export function Signin() {
  const { toast } = useToast();
  const { setTokenKey } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (userData: FieldValues) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/sign-in",
        userData
      );

      toast({
        title: "Success",
        description: "Redirecting...",
        duration: 3000,
      });

      setTimeout(() => {
        setTokenKey(data);
        navigate("/", { replace: true });
        toast({
          title: "Successful",
          description: "Logged in successfully",
          duration: 3000,
        });
      }, 3000);

      reset();
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
    <div className="flex h-[100vh]">
      <Card className="m-auto w-[500px]">
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
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                {...register("username", {
                  required: "Username field is required",
                  minLength: {
                    value: 5,
                    message: "Username has to be at least 5 characters long",
                  },
                })}
                id="username"
                type="text"
              />
              {errors.username && (
                <span className="text-red-300 text-sm">
                  {`${errors.username.message}`}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                {...register("password", {
                  required: "Password field is required",
                  minLength: {
                    value: 3,
                    message: "Password has to be at least 3 characters long",
                  },
                })}
                id="password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-300 text-sm">
                  {`${errors.password.message}`}
                </span>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Toaster />
        </CardFooter>
      </Card>
    </div>
  );
}
