import express from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getMenu,
  getMenuItems,
  updateMenuItem,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/", createMenuItem);
router.get("/", getMenu);
router.get("/:id", getMenuItems);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
