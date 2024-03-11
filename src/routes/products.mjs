import express from "express";

import { products } from "../db/mock-products.mjs";

import { success, getUniqueId } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
   const message = "La liste des produits a bien été récupérée";
   res.json(success(message, products));
});

productsRouter.get("/:id", (req, res) => {
   const productId = req.params.id;
   const message = "La liste des produits a bien été récupérée";
   const product = products.find((product) => product.id == productId);
   res.json(success(message, product));
});

productsRouter.post("/", (req, res) => {
   const id = getUniqueId();
   const createdProduct = { ...req.body, ...{id: id, created: new Date() } };
   products.push(createdProduct);
   const message = `Le produit ${createdProduct.name} a bien été créé !`;
   res.json(success(message, createdProduct));
});

export { productsRouter };