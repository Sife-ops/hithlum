import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParam } from "../../hook/query-param";
import { useAuthContext } from "../../hook/auth-context";

export const Auth: React.FC<{ to: string }> = (p) => {
  const [accessToken, refreshToken] = useQueryParam([
    "accessToken",
    "refreshToken",
  ]);

  const authContext = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    authContext.setSignedIn(true);
    nav(p.to);
  }, []);

  return <div>{accessToken}</div>;
};
