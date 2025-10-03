import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import storeCookies from "../utils/jwt.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
const registerUser = async (req, res) => {
    console.log(req.body);

    const { name, email, password, role } = req.body


    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Credentials are required"
        })

    }
    try {
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }
        const user = await User.create({
            name, email, password, role
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user do not created"
            })
        }


        const token = crypto.randomBytes(32).toString("hex")
        user.verificationToken = token
        await user.save()

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        })


        const mailOptions = {
            from: process.env.MAILTRAP_SENDER_EMAIL,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        };

        await transporter.sendMail(mailOptions)






        return res.status(201).json({
            success: true,
            message: "user Createde Successfully",
            user
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            sucess: false,
            message: "email and password are required"
        })
    }
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.isVerified === false) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email to login"
            })
        }

        const isMatched = bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "User not LoggedIn"
            })
        }

        const payload = {
            userId: user._id,
            role: user.role
        }

        console.log("I am here to check ");



        // token storage

        storeCookies(res, payload)


        return res.status(200).json({
            success: true,
            message: "User LoggedIn Successfully"
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "User not loggedin"
        })
    }
}

const logout = (req, res) => {

    console.log("Logout route accessed", req);

    try {
        // Clear the token cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Error during logout",
        });
    }
}

const verifyUser = async (req, res) => {
    const { token } = req.params
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required"
        })
    }
    try {

        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            })
        }

        user.isVerified = true
        user.verificationToken = null
        await user.save()
        return res.status(200).json({
            success: true,
            message: "User verified successfully"
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

const getMe = async (req, res) => {
    console.log(req);

    const userId = req.user.userId
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized , please login"
        })
    }
    try {
        const user = await User.findById(userId).select("-password -verificationToken -createdAt -updatedAt -passwordResetToken -passwordResetExpires -__v")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => { }

const resetPassword = async (req, res) => { }

const deleteUser = async (req, res) => {
    const userId = req.body
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        })
    }
    try {
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, login, logout, verifyUser, getMe, deleteUser }