import express, { request, response } from "express";
import ProductsController from "./controllers/ProductsController";

const Routes = express();
const productsCtr = new ProductsController();

Routes.get("/products", productsCtr.AllProducts);
Routes.get("/products/:id", productsCtr.ProductsById);
Routes.post("/products", productsCtr.InsertProducts);

export default Routes;