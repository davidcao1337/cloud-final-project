import express from "express";
const router = express.Router();

import { getData } from "../controllers/dataController.js";

// GET Data
router.get('/:id', getData)

export default router