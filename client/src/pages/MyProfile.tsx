import { useEffect } from "react";

import { NavMenu } from "@/components/NavMenu";
import { Input } from "@/components/ui/input";
import { useRecipe } from "@/hooks/useRecipe";
import { useUser } from "@/hooks/useUser";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { updateUser, user, setUser } = useUser();
  const { getRecipesForUser, myRecipes } = useRecipe();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (event: any) => {
    const { value, name } = event.target;
    setUser({ ...user!, [name]: value! });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await updateUser(user);
      navigate("/my-profile", { replace: false });
    } catch (error) {
      console.error("There has been an error while updating user.");
    }
  };

  useEffect(() => {
    getRecipesForUser();
    console.log(location);
  }, []);

  return (
    <>
      <NavMenu />
      <div className="hidden lg:flex items-center justify-center max-w-[100%] my-10">
        <div className="flex flex-col items-center justify-center w-[100%]">
          <form>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className="m-2 w-[600px]"
              id="firstName"
              name="firstName"
              type="text"
              value={!user!.firstName ? "" : user!.firstName}
              onChange={handleInput}
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              className="m-2 w-[600px]"
              type="text"
              id="lastName"
              name="lastName"
              value={!user!.lastName ? "" : user!.lastName}
              onChange={handleInput}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              className="m-2 w-[600px]"
              id="email"
              name="email"
              type="email"
              value={!user!.email ? "" : user!.email}
              onChange={handleInput}
            />
            <Button onClick={handleSubmit} className="m-2 w-[600px]">
              Update
            </Button>
          </form>
          <div className="my-10">
            <strong>~ Overview ~</strong>
            <div className="border border-y-[1px] border-gray w-[100%] my-4" />
            <Label>Recipes published</Label>
            <Input
              className="m-2 w-[600px]"
              type="text"
              value={myRecipes.length}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex items-center m-5 lg:hidden">
        <div className="grid w-screen md:place-content-center">
          <strong className="text-center my-10">
            ~ User Profile Overview ~
          </strong>
          <form className="w-screen flex flex-col items-center justify-center">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className="bg-white text-black text-center my-2"
              id="firstName"
              name="firstName"
              type="text"
              value={!user!.firstName ? "" : user!.firstName}
              onChange={handleInput}
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              className="bg-white text-black text-center my-2"
              type="text"
              id="lastName"
              name="lastName"
              value={!user!.lastName ? "" : user!.lastName}
              onChange={handleInput}
            />
            <Label htmlFor="username">Username</Label>
            <Input
              className="bg-white text-black text-center my-2"
              type="text"
              id="username"
              name="username"
              value={!user!.username ? "" : user!.username}
              onChange={handleInput}
            />
            <Label htmlFor="username">Email</Label>
            <Input
              className="bg-white text-black text-center my-2"
              id="email"
              name="email"
              type="email"
              value={!user!.email ? "" : user!.email}
              onChange={handleInput}
            />
            <Button
              onClick={handleSubmit}
              variant="secondary"
              className="m-2 w-screen"
            >
              Update
            </Button>
          </form>
          <div className="w-screen flex flex-col items-center justify-center my-10">
            <strong>~ Overview ~</strong>
            <div className="border border-y-[1px] border-gray w-[100%] my-4" />
            <Label>Recipes published</Label>
            <Input
              className="bg-white text-black text-center my-2"
              type="text"
              value={myRecipes.length}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
