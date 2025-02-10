import express from "express"
import { lgoin, logout, register } from "../controller/user.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", lgoin);
router.post("/logout", logout);

export default router;