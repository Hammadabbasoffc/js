import router from "express"

import { registerUser, login, verifyUser, logout, getMe, deleteUser } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middlewares/isLoggedin.js"
import isAdmin from "../middlewares/isAdmin.js"

const userRouter = router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.get('/verify/:token', verifyUser)
userRouter.post("/logout", isLoggedIn, logout)
userRouter.get("/me", isLoggedIn, getMe)
userRouter.delete("/delete", isLoggedIn, isAdmin, deleteUser)

export default userRouter