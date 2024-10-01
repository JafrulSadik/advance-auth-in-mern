import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config/config";
import { db } from "./config/db";
import authRoutes from "./router/auth.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(config.port, () => {
  db();
  console.log("Server is listening at port : ", config.port);
});
