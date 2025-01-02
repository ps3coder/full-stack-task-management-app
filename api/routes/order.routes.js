import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const router = express.Router();

router.post("", verifyToken, createOrder);
router.get("/:id", verifyToken, getOrder);
router.get("/", verifyToken, getAllOrders);
router.patch("/:id", verifyToken, updateOrderStatus);
router.delete("/:id", verifyToken, deleteOrder);

export default router;
