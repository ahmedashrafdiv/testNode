
// ! Create a simple Express.js App with todos endpoints for GET, POST,PUT,PATCH and DELETE

const express = require("express");
const app = express();
const mongoose = require('mongoose')
const todosRouter = require("./routes/todos")
const usersRouter = require("./routes/users")

// built in middleware 
app.use(express.json())

app.use('/todos', todosRouter)
app.use('/users', usersRouter)


mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>console.log("connected")).catch(err => console.log(err));

app.listen(4000,()=>{
    console.log("hello the app listen in 4000");
});

