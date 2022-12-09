import express from "express"
const router =express.Router()
import  {authUser, getUserProfile,registerUser,updateUserProfile,allUsers}  from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"


router.post('/login',authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/").post(registerUser)
router.route("/all").get(allUsers)
// router.route("/signup").post(registerSignUp)
export default router   