import Router from "express"
import { createUser, getAllUsers } from "./user.controller.js"
import { upload } from '../../core/middleware/multer.js'
const userRouter = Router()

userRouter.get("/all-users", getAllUsers)
userRouter.post("/create-user", upload.single('avatar'), createUser)

export default userRouter