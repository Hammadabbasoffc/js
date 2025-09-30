import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import storeCookies from "../utils/jwt.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
const registerUser = async (req, res) => {
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

export { registerUser, login }