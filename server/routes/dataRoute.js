import express from "express";
const router = express.Router();

import { getData, getDataCollection, getHouseholdSpendData, uploadFile, getFiles } from "../controllers/dataController.js";

// GET Data
router.get('/:hshd_num_selection/:sort_selection', getData)

router.get('/all', getDataCollection)

router.get('/householdSpend', getHouseholdSpendData)

router.post('/sarah/:file_name', uploadFile)

router.get('/sarah/:file_name', getFiles)

export default router