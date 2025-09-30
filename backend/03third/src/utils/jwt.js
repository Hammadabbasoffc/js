import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const storeCookies = (res, payload) => {
    const isProduction = process.env.NODE_ENV === 'production'
    const token = jwt.sign(payload, process.env.JWT_SECRET, '1d')
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        maxAge: 24 * 60 * 60 * 1000
    })
}

export default storeCookies