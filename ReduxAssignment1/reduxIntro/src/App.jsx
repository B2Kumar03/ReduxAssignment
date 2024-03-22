import { useState } from "react";
import { legacy_createStore } from "redux";
import "./App.css";

const reduxReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return state=0;
    
    default:
      return state;
  }
};

export const store = legacy_createStore(reduxReducer, 1);

function App() {
  const [state, setState] = useState(0);

  const updater = (a) => {
    store.dispatch({ type: a });
  };

  store.subscribe(() => {
    setState((prev) => prev + 1);
  });

  return (
    <>
      <h1>Redux intro level Assignment</h1>
      <hr />

      <p>Count : {JSON.stringify(store.getState())}</p>

      <button onClick={() => updater("INCREMENT")}>+1</button>
      <button onClick={() => updater("RESET")}>Reset</button>
      <button onClick={() => updater("DECREMENT")}>-1</button>
    </>
  );
}

export default App;
