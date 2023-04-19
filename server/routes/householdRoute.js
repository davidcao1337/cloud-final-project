import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import { createHousehold, getHouseholds } from "../controllers/householdController.js";
const router = express.Router();
router.use(requireAuth);

// post a new household
router.post('/', createHousehold)

// GET all households
router.get('/', getHouseholds)

export default router
