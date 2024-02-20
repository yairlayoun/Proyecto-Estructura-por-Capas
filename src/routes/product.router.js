// productsRouter.js
import express from "express";
import * as productsController from "../dao/fileSystem/controllers/products/productsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await productsController.getProducts(req, res);
});

router.get("/:productId", async (req, res) => {
  await productsController.getProductById(req, res);
});

router.post("/", async (req, res) => {
  await productsController.addProduct(req, res);
});

router.put("/:productId", async (req, res) => {
  await productsController.updateProduct(req, res);
});

router.delete("/:productId", async (req, res) => {
  await productsController.deleteProduct(req, res);
});

export default router;
