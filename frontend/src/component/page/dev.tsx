import { graphql } from "@hithlum/graphql/gql";
import { useHelloQuery } from "@hithlum/graphql/urql";
import { useEffect } from "react";

const hello = graphql(`
  query hello {
    hello
  }
`);

export const Dev = () => {
  const [helloQueryState] = useHelloQuery();
  // const [worldQueryState] = useWorldQuery();

  useEffect(() => {
    const { fetching, data } = helloQueryState;
    if (!fetching) {
      console.log(data);
    }
  }, [helloQueryState.data]);

  // useEffect(() => {
  //   const { fetching, data } = worldQueryState;
  //   if (!fetching) {
  //     console.log(data);
  //   }
  // }, [worldQueryState.data]);

  return (
    <div>
      <div>dev</div>
    </div>
  );
};
