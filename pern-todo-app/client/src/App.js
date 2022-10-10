import React, { Fragment } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";

//components
import ListTodos from "./Components/ListTodo";
import InputTodo from "./Components/InputTodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <HashRouter> {/* för att kunna navgera mellan components */}
          <InputTodo />
          <ListTodos />
        </HashRouter>
      </div>
    </Fragment>
  );
}

export default App;
