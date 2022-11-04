import { useUserContext } from "../hook/user-context";

export const StatusBar = () => {
  const ctx = useUserContext();

  if (ctx.updatingFeed) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          left: "0",
          right: "0",
          backgroundColor: "lightblue",
        }}
      >
        <div>Updating {ctx.updatingFeed}</div>
      </div>
    );
  }

  return null;
};
