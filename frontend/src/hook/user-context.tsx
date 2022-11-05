import React, { useEffect, useState } from "react";
import { graphql } from "@hithlum/graphql/gql";
import {
  Feed,
  useMyFeedsQuery,
  useUpdateFeedMutation,
} from "@hithlum/graphql/urql";
import _ from "lodash";

// todo: delete comments
type UserContextType = {
  // myFeeds: Feed[] | undefined;
  // updateFeeds: () => Promise<void>;
  // updatingFeed: string | undefined;
};

const userContext = (): UserContextType => {
  // useEffect(() => {
  //   const autoUpdate = setInterval(() => {
  //     updateFeeds();
  //   }, 1000 * 60 * 30); // todo: configurable in settings
  //   return () => clearInterval(autoUpdate);
  // });

  return {
    // myFeeds,
    // updateFeeds,
    // updatingFeed,
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
