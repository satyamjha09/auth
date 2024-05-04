const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();  

exports.signup = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });

        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });

    } catch (err) {

        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again'
        });

    }
};

// login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "User needs to fill in details"
            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });

        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            console.log(user);
            user.password = undefined;
            console.log(user);

            const options = {

                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,

            };

            res.cookie("satyam", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully'
            });
        } else {

            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            });

        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
};




