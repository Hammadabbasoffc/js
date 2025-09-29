import User from '../model/User.model.js'

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

export { registerUser }