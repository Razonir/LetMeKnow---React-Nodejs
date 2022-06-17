import express from "express";
import controller from '../controllers/auth.controller.js';
import analytics from '../analytics/analytics.js';
import contactUs from '../contact/contact.js';

let router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/googleLogin", controller.googleLogin);
router.get("/analytics", analytics.analytics);
router.post("/contactus", contactUs.contactUs);
router.post("/adminChecker", controller.checkAdminRole);

export default router;
