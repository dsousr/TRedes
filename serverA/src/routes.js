import { Router } from "express";
import authController from "./controllers/authController.js";
import profileController from "./controllers/profileController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const router = Router();

router.post("/login", authController.login);
router.get("/meu-perfil", authMiddleware, profileController.profile);

export default router;
