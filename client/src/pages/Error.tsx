import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TError } from "@/types";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as TError;

  return (
    <Card
      className="flex flex-col items-center justify-center h-[100vh]"
      id="error-page"
    >
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>Error!</CardTitle>
        <CardDescription>An unexpected error has occured</CardDescription>
      </CardHeader>
      <CardContent>
        <i className="text-2xl">
          {`${error.status}: ${error.statusText}` || error.message}
        </i>
      </CardContent>
    </Card>
  );
}
