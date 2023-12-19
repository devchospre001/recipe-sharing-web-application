import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavMenu } from "@/components/nav-menu";

const MyProfile = () => {
  return (
    <>
      <NavMenu />
      <Card className="grid grid-rows-1 items-center justify-center m-auto w-[50%]">
        <CardHeader className="flex items-center">~ My Profile ~</CardHeader>
        <CardContent>Hello</CardContent>
      </Card>
    </>
  );
};

export default MyProfile;
