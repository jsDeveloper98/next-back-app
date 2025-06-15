import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { validateRegister } from "../helpers/registration";
// import { validateLogin, validateRegister } from "../validators";

const authRoute = Router();

// router.get("/auth/logout", AuthController.logout);
// router.get("/auth/check", AuthController.checkAuth);
authRoute.post("/auth/login", AuthController.login);
authRoute.post("/auth/register", validateRegister(), AuthController.register);

// router.post("/auth/register", validateRegister(), AuthController.register);

export default authRoute;
