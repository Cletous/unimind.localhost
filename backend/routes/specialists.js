import express from "express";
import { getSpecialists, dismissSpecialist, promoteToSpecialist} from "../controllers/specialist.js";

const router = express.Router()

router.get("/", getSpecialists);
router.get("/dismiss/:id", dismissSpecialist);
router.post("/promote/:email", promoteToSpecialist);

export default router;

