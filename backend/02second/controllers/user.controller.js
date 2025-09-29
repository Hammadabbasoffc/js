import User from '../model/User.model.js'
import { storeCookies } from '../utils/jwt.js';

const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json(
            {
                success: false,
                message: "Name, email and password are required"
            }
        );
    }

    try {

        const existingUser = await User.findOne(
            { email }
        )

        if (existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User already exists"
                }
            );
        }

        const user = await User.create({
            name, email, password, role
        })

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User registration failed"
                }
            )
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })


    } catch (error) {
        console.log(error);
    }

}

const login = async (req, res) => {
    // email , password
    // 1. check if user exists
    // 2. check if password matches
    // 3. create a JWT token and stores in cookies
    // 4. return response

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invaid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invaid credentials"
            });
        }

        const payload = {
            userId: user._id,
            role: user.role
        }

        storeCookies(res, payload);
        // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })



    } catch (error) {
        console.log(error);
    }



}

export { registerUser, login }