import router from "express"

import { registerUser, login, verifyUser } from "../controllers/user.controller.js"

const userRouter = router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.get('/verify/:token', verifyUser)

export default userRouter