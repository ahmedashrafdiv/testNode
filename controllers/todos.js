let fs = require("fs");

const todosModel = require("../models/todos");

const getAllTodos = async (req, res) => {
  try {
    const todos = await todosModel.find({}).populate('userId');
    if (todos.length == 0) {
      res.status(404).json({ message: "No Todos Found!" });
      return;
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const findTodo = await todosModel.findById(id);

    if (findTodo == undefined) {
      res.status(404).json({ message: "No Todo Found!" });
      return;
    }

    res.status(200).json(findTodo);
  } catch (error) {
    res.status(400).json({ message: `the Error is: ${error.message}` });
  }
};

const createTodo = async (req, res) => {
  const newTodoBody = req.body;
  try {
    const existingTodo = await todosModel.findOne({ title: newTodoBody.title });

    // Check if a todo with the same title already exists
      if (existingTodo) {
        return res
          .status(400)
          .json({ message: "Todo with the same title already exists!" });
      }

    const todo = await todosModel.create(newTodoBody);
    res.status(201).json({ message: "created!!" });
  } catch (error) {
    res.status(400).json({ message: `the Error is: ${error.message}` });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodoBody = req.body;
  try {
    const updatedTodo = await todosModel.findByIdAndUpdate(id, updatedTodoBody);
    if (!updatedTodo) {
      // todo is null
      return res.status(404).json({ message: "Todo Not Found!" });
    }
    res.status(200).json({ message: "updated!!" });
  } catch (error) {
    res.status(400).json({ message: `the Error is: ${error.message}` });
  }
};

// const updateFiledTodo = (req, res) => {
//     const { id } = req.params;
//     const {title} = req.body;
//     let todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
//     const findTodo = todos.find((t)=> t.id == id)

//     if (findTodo === undefined) {
//         res.status(404).send("Todo Not Found!");
//         return;
//     }

//     todos[(todos.indexOf(findTodo))].title = title;
//     fs.writeFileSync("./todos.json", JSON.stringify(todos))
//     res.status(200).send("Todos partially updated!");
// }

const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await todosModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      res.status(404).json({ message: "Todo Not Found!!" });
      return;
    }
    res.status(200).json({ message: "Deleted!!" });
  } catch (error) {
    res.status(400).json({ message: `the Error is: ${error.message}` });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const todoCount = await todosModel.countDocuments();
    if (todoCount === 0) {
      res.status(404).json({ message: "No Todos Found!" });
      return;
    }
    await todosModel.deleteMany();
    res.status(200).json({ message: "Deleted All Todos!!" });
  } catch (error) {
    res.status(400).json({ message: `the Error is: ${error.message}` });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodoById,
  deleteAllTodos,
};
