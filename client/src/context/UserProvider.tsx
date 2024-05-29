import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

import { TChildProps, TUserCTX, TUserContext } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { serverUrl } from "@/api/config";

export const UserContext = createContext<TUserContext>({} as TUserContext);

const UserContextProvider = ({ children }: TChildProps) => {
  const { Provider } = UserContext;
  const [user, setUser] = useState<TUserCTX>({} as TUserCTX);
  const [error, setError] = useState<AxiosError>();

  const { token } = useAuth();
  const authToken = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/user/currentLoggedInUser`,
        authToken
      );

      setUser(response.data);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUser = async (user: any) => {
    try {
      await axios.patch(`${serverUrl}/user/${user.id}`, user, authToken);
    } catch (_error) {
      const axiosError = _error as AxiosError;
      setError(axiosError);
      toast({
        title: `Error ${error?.response?.status}`,
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const contextValue = {
    error,
    user,
    setUser,
    updateUser,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default UserContextProvider;
