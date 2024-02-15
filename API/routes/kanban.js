import express from "express";
import {
  PatchTaskPosition,
  getColumns,
  getTasks,
} from "../controllers/kanban.js";
const KanbanRouter = express.Router();

KanbanRouter.get("/columns", getColumns);
KanbanRouter.get("/tasks", getTasks);
KanbanRouter.patch("/task/edit", PatchTaskPosition);

export default KanbanRouter;
