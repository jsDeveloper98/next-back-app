import cors from "cors";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute";
import { connectDB } from "./config/database";

config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoute);

connectDB(app);
