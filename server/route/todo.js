import express from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controller/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/",isAuthenticated, createTodo)
router.get("/",isAuthenticated, getAllTodos);
router.put("/:todoId",isAuthenticated, updateTodo);
router.delete("/:todoId",isAuthenticated, deleteTodo);

export default router