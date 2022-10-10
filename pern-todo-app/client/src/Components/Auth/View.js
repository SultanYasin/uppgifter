import React, { useState } from "react";
import InputTodo from "../InputTodo";
import ListTodos from "../ListTodo";
import EditTodo from "../EditTodo";

export default function View() {
  const [showComponents, setShowComponents] = useState(false);

  const toggle = (event) => {
    setShowComponents((current) => !current);
  };

  return (
    <div>
      <button
        onClick={toggle}
        className="btn btn-primary"
        style={{ marginLeft: "46%" }}
      >
        my List
      </button>
      {showComponents && (
        <div>
          <InputTodo />
          <ListTodos />
          
        </div>
      )}
    </div>
  );
}
