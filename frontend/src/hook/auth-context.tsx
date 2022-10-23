import React, { useState, useEffect } from "react";

type Context = {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: () => void;
};

const useContext = (): Context => {
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const signOut = () => {
    localStorage.clear();
    window.location.href =
      import.meta.env.VITE_REGISTRAR_URL + "/sign-in?serviceId=hithlum";
  };

  return {
    signedIn,
    setSignedIn,
    signOut,
  };
};

const AuthContext = React.createContext<Context | undefined>(undefined);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const context = useContext();

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};
