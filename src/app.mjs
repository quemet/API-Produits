import express from "express";

import { productsRouter } from "./routes/products.mjs";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
   res.send("API REST of self service machine !");
});

app.get("/api/", (req, res) => {
   res.redirect(`http://localhost:${port}`);
});

app.use("/api/products", productsRouter);

app.listen(port, () => {
   console.log(`Example app listening on port http://localhost:${port}`);
});