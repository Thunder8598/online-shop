import { Request, Response } from "express";
import DB from "./../database/DBConnection";
import Products from "./../types/Products";

class ProductsController {

    private static ImgPath = "http://localhost:8080/uploads/";

    //Faz a conversão dos preços de números para texto
    private static DecimalConverter = (price?: number | string, convertToRs = true) => {

        const stringPrice = String(price);

        let formatPrice = (convertToRs) ? stringPrice.replace(".", ",") : stringPrice.replace(",", ".");

        return formatPrice;
    }

    //Exibe todos os produtos da DB
    AllProducts = async (request: Request, response: Response) => {

        const search = String(request.query.search); //Recebe uma query via URL

        let products: Products[];
        products = [];

        if ((search !== "null") && (search !== "undefined"))
            products = await DB("products").select("*").where("ProductsName", "like", `${search}%`);

        else products = await DB("products").select("*");

        //Muda o formato de cada preço de cada produto e adiciona URL de cada imagem de cada produto
        products.map((product: Products) => {
            product.ProductsPrice = ProductsController.DecimalConverter(product.ProductsPrice);
            product.ProductsImg = ProductsController.ImgPath + product.ProductsImg;
        });

        return response.json(products);
    }

    //Exibe as informações por produtos
    ProductsById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        const product = await DB("products").select("*").where("ProductsId", id).first();

        product.ProductsPrice = ProductsController.DecimalConverter(product.ProductsPrice);
        product.ProductsImg = ProductsController.ImgPath + product.ProductsImg;

        return response.json(product);
    }

    //Insere dados no BD
    InsertProducts = async (request: Request, response: Response) => {

        //Desestrutura formulario da aplicação web
        const {
            ProductsName,
            ProductsManufactory,
            ProductsDescription,
        } = request.body;

        const ProductsPrice = Number(ProductsController.DecimalConverter(request.body.ProductsPrice, false));

        if (ProductsName === "" || ProductsManufactory === "" || ProductsDescription === "" || ProductsPrice === 0)
            return response.json(false);

        //Restrutura formulário em objeto
        const product = {
            ProductsName,
            ProductsManufactory,
            ProductsDescription,
            ProductsPrice: Number(ProductsPrice),
            ProductsImg: (request.file !== undefined) ? request.file.filename : "",
        }

        if (product.ProductsImg === "") return response.json(false);

        try {
            await DB("products").insert(product);

        } catch (error) {
            return response.json(false);
        }

        return response.json(true);
    }
}

export default ProductsController;