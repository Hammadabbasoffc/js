import jwt from "jsonwebtoken"

export const isLoggedIn = (req, res, next) => {

    const token = req.cookies?.jwt

    console.log(req.cookies);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized , please login"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        console.log(decoded);

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized , please login"
        })
    }
}