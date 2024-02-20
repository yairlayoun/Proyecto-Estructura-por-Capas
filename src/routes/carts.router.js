// cartsRouter.js
import express from "express";
import * as cartsController from "../dao/fileSystem/controllers/carts/cartsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await cartsController.getCarts(req, res);
});

router.get("/:cartId", async (req, res) => {
  await cartsController.getCartById(req, res);
});

router.post("/", async (req, res) => {
  await cartsController.createCart(req, res);
});

router.post("/:cartId/add-product/:productId", async (req, res) => {
  await cartsController.addProductToCart(req, res);
});

export default router;
