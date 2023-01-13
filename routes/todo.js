const express = require("express");
const auth = require("../middleware/user_jwt");

const Todo = require("../models/Todo");
const router = express.Router();

//desc create new todo desck
//method pos

router.post("/", auth, async (req, res, next) => {
  try {
    const toDo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
    });
    if (!toDo) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      todo: toDo,
      msg: "successful created",
    });
  } catch (error) {
    next(error);
  }
});

//fetch all todos
//method get

router.get("/", auth, async (req, res, next) => {
  try {
    const todo = await Todo.find({ user: req.user.id, finished: false });

    if (!todo) {
      return res.status(400).json({
        success: false,
        msg: "something error happened",
      });
    }
    res.status(200).json({
      success: true,
      count: todo.length,
      todos: todo,
      msg: "successfully fetched",
    });
  } catch (error) {
    next(error);
  }
});

//fetch all todos of finsihed: true
//method get

router.get("/finished", auth, async (req, res, next) => {
  try {
    const todo = await Todo.find({ user: req.user.id, finished: true });

    if (!todo) {
      return res.status(400).json({
        success: false,
        msg: "something error happened",
      });
    }
    res.status(200).json({
      success: true,
      count: todo.length,
      todos: todo,
      msg: "successfully fetched",
    });
  } catch (error) {
    next(error);
  }
});

// desc update a task
// method put
router.put("/:id", async (req, res, next) => {
  try {
    let toDo = await Todo.findById(req.params.id);
    if (!toDo) {
      return res.status(400).json({
        success: false,
        msg: "Task todo not exists",
      });
    }
    toDo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      todo: toDo,
      msg: "Successfully updated",
    });
  } catch (error) {
    next(error);
  }
});

//desc delelte a task todo
//method delelte

router.delete("/:id", async (req, res, next) => {
  try {
    let toDo = await Todo.findById(req.params.id);
    if (!toDo) {
      return res.status(400).json({
        success: false,
        msg: "Task todo not exists",
      });
    }
    toDo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: "successful deleted task",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
