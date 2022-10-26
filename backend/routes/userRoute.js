import express from "express"
import  {authUser, getUserProfile,registerUser,registerSignUp}  from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
const router =express.Router()


router.post('/login',authUser)
router.route("/profile").get(protect,getUserProfile)
router.route("/").post(registerUser)
router.route("/signup").post(registerSignUp)
export default router   