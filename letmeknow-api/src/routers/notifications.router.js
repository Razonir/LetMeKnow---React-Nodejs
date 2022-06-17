import express from "express";
import controller from "../controllers/notifications.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';

let router = express.Router();
router.use(authMiddleware);
router.get("/", controller.getAll);
router.delete("/:id", controller.remove);

export default router;
