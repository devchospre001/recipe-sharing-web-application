import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

import { TChildProps, TAuthContext } from "@/types";

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

const AuthContextProvider = ({ children }: TChildProps) => {
  const { Provider } = AuthContext;
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setTokenKey = (newToken: string) => {
    setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setTokenKey,
    }),
    [token]
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export default AuthContextProvider;
