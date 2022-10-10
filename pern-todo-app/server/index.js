const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body



// varje http-metod tar in en end-point, samt en async function som tar in ett request- och ett respons-objekt
// i de fall clienten förväntas skicka med någon input-data - hämtar jag det från (request-objektet).body, och sparar värdena först.
// i de fall jag behöver info om en specifik item id som finns i url'en - hämtas  det från (request-objektet).params.id och sparar värdet först.
// sedan skickar en sql-query till databasen (post, put, delete och get(specific) metoderna skickar med de sparade värdena från .body 
//och/eller .params.id där de behövs) och efter queryn har körts klart 
// sparas resultatet.
// datan som ligger i resultatets .rows görs om till json och skickas tillbaka till client-sidan i response-objektet 


//ROUTES//
//create a todo 

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    //ifall blev nåt fel -> clienten redirect:as till index.html
    res.sendFile('./index.html');
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
     //ifall blev nåt fel -> clienten redirect:as till index.html
    res.sendFile('./index.html');
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    //On Error
    console.error(err.message);
    res.sendFile('./index.html');
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    //On Error
    console.error(err.message); 
    res.sendFile('./index.html');
    
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    //On Error
    console.log(err.message);
    res.sendFile('./index.html');
  }
});


app.listen(5000, () => {
  console.log("server has started on port 5000");
});
