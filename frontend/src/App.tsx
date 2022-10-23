import "./App.css";
import reactLogo from "./assets/react.svg";
import { graphql } from "@hithlum/graphql/gql";
import { useHelloQuery, useWorldQuery } from "@hithlum/graphql/urql";
import { useState, useEffect } from "react";

const hello = graphql(`
  query hello {
    hello
  }
`);

const world = graphql(`
  query world {
    world
  }
`);

function App() {
  const [count, setCount] = useState(0);

  const [helloQueryState] = useHelloQuery();
  const [worldQueryState] = useWorldQuery();

  useEffect(() => {
    const { fetching, data } = helloQueryState;
    if (!fetching) {
      console.log(data);
    }
  }, [helloQueryState.data]);

  useEffect(() => {
    const { fetching, data } = worldQueryState;
    if (!fetching) {
      console.log(data);
    }
  }, [worldQueryState.data]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
