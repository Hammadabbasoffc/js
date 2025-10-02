import router from "express"

import { registerUser, login, verifyUser, logout, getMe } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middlewares/isLoggedin.js"

const userRouter = router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.get('/verify/:token', verifyUser)
userRouter.post("/logout", isLoggedIn, logout)
userRouter.get("/me", isLoggedIn, getMe)

export default userRouter