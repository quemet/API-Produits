import express from "express";

import { products, getProduct, getUniqueId, updateProduct, removeProduct } from "../db/mock-products.mjs";

import { success } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
   const message = "La liste des produits a bien été récupérée";
   res.json(success(message, products));
});

productsRouter.get("/:id", (req, res) => {
   const productId = req.params.id;
   const message = "La liste des produits a bien été récupérée";
   const product = getProduct(productId);
   res.json(success(message, product));
});

productsRouter.post("/", (req, res) => {
   const id = getUniqueId();
   const createdProduct = { ...req.body, ...{id: id, created: new Date() } };
   products.push(createdProduct);
   const message = `Le produit ${createdProduct.name} a bien été créé !`;
   res.json(success(message, createdProduct));
});

productsRouter.delete("/:id", (req, res) => {
   const productId = req.params.id;
   let deletedProduct = getProduct(productId);
   removeProduct(productId);
   const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
   res.json(success(message, deletedProduct));
});

productsRouter.put("/:id", (req, res) => {
   const productId = req.params.id;
   const product = getProduct(productId);
   const updatedProduct = {
      id: productId,
      ...req.body,
      created: product.created,
   };
   updateProduct(productId, updatedProduct);
   const message = `Le produit ${updatedProduct.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
   res.json(success(message, updatedProduct));
});

export { productsRouter };