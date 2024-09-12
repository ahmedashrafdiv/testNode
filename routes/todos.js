

const express = require("express");
const router = express.Router()
let fs = require("fs");

const {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodoById,
    deleteAllTodos
} = require("../controllers/todos");


// get => get all todos
router.get("/",getAllTodos)

// get => get specific todos with ID params
router.get("/:id",getTodoById)

// post => add One todos 
router.post("/",createTodo)

// put => update todos
router.put("/:id",updateTodo)

// patch => partially update todos
router.patch("/:id", updateTodo);

// delete => delete specific todos 
router.delete("/:id",deleteTodoById)

// delete => delete All todos 
router.delete("/",deleteAllTodos)

module.exports = router;