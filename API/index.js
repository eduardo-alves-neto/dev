import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import ProductRouter from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/products", ProductRouter);

app.listen(8800);
