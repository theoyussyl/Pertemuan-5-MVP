import express from "express";
import cors from "cors";
import path from "path";

export const App = express();

App.use(cors());
App.use(express.json());
App.use("/uploads", express.static(path.join(__dirname, "../uploads")));
