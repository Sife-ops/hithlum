import React, { useEffect, useState } from "react";
import { graphql } from "@hithlum/graphql/gql";
import _ from "lodash";
import { User, useSelfQuery } from "@hithlum/graphql/urql";

type UserContextType = {
  self: User | undefined;
};

const userContext = (): UserContextType => {
  const [self, setSelf] = useState<User>();
  const [selfQueryState] = useSelfQuery();
  useEffect(() => {
    const { fetching, data } = selfQueryState;
    if (!fetching && data) {
      setSelf(data.user as User);
    }
  }, [selfQueryState.data]);

  return {
    self,
  };
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const context = userContext();

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};

graphql(`
  query self {
    user {
      ...UserPreviewFields
      roles
    }
  }
`);
