import express, { Request, Response } from "express";
import cors from "cors";
import Routes from "./routes";
import path from "path";
import multer from "multer";
import Config from "./multerConfig";

const App = express();
const Upload = multer(Config);

App.use(cors());
App.use(express.json());

App.use(Upload.single("ProductsImg"));

App.use(Routes);
App.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

App.listen(8080);