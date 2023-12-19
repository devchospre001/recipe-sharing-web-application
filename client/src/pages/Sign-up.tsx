import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

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
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";

export function Signup() {
  const { toast } = useToast();
  const { setTokenKey } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (userData: FieldValues) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/sign-up",
        userData
      );

      toast({
        title: "Creation success",
        description: "Redirecting...",
        duration: 3000,
      });

      setTimeout(() => {
        setTokenKey(data);
        navigate("/", { replace: true });
        toast({
          title: "Success",
          description: "You have successfully created an account",
          duration: 3000, // see why this is not showing
        });
      }, 3000);
    } catch (error) {
      toast({
        title: "Add an error name",
        description: "Add an error description",
      });
    }
    reset();
  };

  return (
    <div className="flex h-[100vh]">
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
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
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
                {...register("username", {
                  required: "Username field is required",
                  minLength: {
                    value: 5,
                    message: "Username has to be at least 5 characters long",
                  },
                })}
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
                id="password"
                type="password"
                {...register("password", {
                  required: "Password field is required",
                  minLength: {
                    value: 3,
                    message: "Password has to be at least 3 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-300 text-sm">
                  {`${errors.password.message}`}
                </span>
              )}
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
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Create account
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
