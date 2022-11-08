import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/auth-context";

export const PrivateRoutes: React.FC = () => {
  const { signedIn } = useAuthContext();

  if (!signedIn) {
    window.location.href =
      import.meta.env.VITE_REGISTRAR_URL + "/sign-in?serviceId=feedshare";
  }

  return <Outlet />
};
