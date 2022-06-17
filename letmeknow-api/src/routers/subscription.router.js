import express from "express";
import controller from '../controllers/subscription.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

let router = express.Router();
router.use(authMiddleware);
router.post("/", controller.add);
router.get("/", controller.getAll);
router.delete("/:id", controller.remove);


export default router;
