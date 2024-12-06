import express from "express";
import { getUser , updateUser, updateProfile} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.post("/update-profile", updateProfile)

export default router