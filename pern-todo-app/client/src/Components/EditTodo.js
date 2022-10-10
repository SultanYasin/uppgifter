import React, { Fragment, useEffect, useState } from "react";


const EditTodo = ({ todo }) => {
  // jag använder descrptions state för att när man vill updatera värden på en specifik todo so ser man vilken text har varit innan
  const [description, setDescription] = useState(todo.description); 

  //edit description function 

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // hämtar specifik grej från url
      const response = await fetch(`http://localhost:5000/todos/${todo.id}`, { // hämtar todo med specifik id
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    window.location = "/" 

    } catch (err) {
      console.error(err.message);
    }
  };


  /* jag använde Bootstrap 4 för styling */
  return (
    <Fragment >
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>
              
      <div
        className="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
        >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e) }
                
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;

