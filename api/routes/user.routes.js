import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", verifyToken, getUsers);
router.get("/me", verifyToken, getMe);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
