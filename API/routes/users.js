import express from "express";
import { getUsers } from "../controllers/user.js";
import { postUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/",postUser)

export default userRouter;
