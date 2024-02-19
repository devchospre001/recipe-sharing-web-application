import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavMenu } from "@/components/NavMenu";
import { Input } from "@/components/ui/input";
import { endpoints } from "@/api/config";
import { useAuth } from "@/hooks/useAuth";
import { useRecipe } from "@/hooks/useRecipe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const { token } = useAuth();
  const { getRecipesForUser, myRecipes } = useRecipe();

  useEffect(() => {
    axios
      .get(endpoints.GET_USER, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setCurrentUser(response.data);
      });
    getRecipesForUser();
  }, []);

  return (
    <>
      <NavMenu />
      <Card className="flex flex-col items-center justify-center w-[100%]">
        <CardHeader className="flex items-center">
          ~ Profile Overview ~
        </CardHeader>
        <CardContent>
          <div>
            <Input
              className="m-2 w-[600px]"
              type="text"
              readOnly
              value={currentUser.firstName ?? "John"}
            />
            <Input
              className="m-2 w-[600px]"
              type="text"
              readOnly
              value={currentUser.lastName ?? "Doe"}
            />
            <Input
              className="m-2 w-[600px]"
              type="text"
              readOnly
              value={currentUser.username}
            />
            <Input
              className="m-2 w-[600px]"
              type="email"
              readOnly
              value={currentUser.email ?? "johndoe@fakestemailever@bosnia.com"}
            />
            <h1 className="m-2">Recipes published: {myRecipes.length}</h1>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MyProfile;
