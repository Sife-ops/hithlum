import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/auth-context";

export const PrivateRoutes: React.FC<{errorTo: string}> = (p) => {
  const location = useLocation();
  const { signedIn } = useAuthContext();

  return signedIn ? (
    <Outlet />
  ) : (
    <Navigate to={p.errorTo} replace state={{ from: location }} />
  );
};
