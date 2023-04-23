import express from "express";
const router = express.Router();

import { getData} from "../controllers/dataController.js";

// GET Data
router.get('/:hshd_num_selection/:sort_selection', getData)





export default router