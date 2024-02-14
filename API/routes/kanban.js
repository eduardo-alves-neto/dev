import express from "express";
import { getColumns, getTasks } from "../controllers/kanban.js";
const KanbanRouter = express.Router();

KanbanRouter.get("/columns", getColumns);
KanbanRouter.get("/tasks", getTasks);

export default KanbanRouter;
