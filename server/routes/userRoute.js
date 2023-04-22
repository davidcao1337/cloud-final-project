import express from "express";
const router = express.Router();

import { registerUser, loginUser, getUser } from "../controllers/userController.js";

// Login User
router.post('/login', loginUser);

// Register User
router.post('/register', registerUser);

// GET User
router.get('/:id', getUser)

export default router