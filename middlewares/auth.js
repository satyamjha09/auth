const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // assuming token is sent as a bearer token in the authorization header

        if (!token) {
            throw new Error('Token Missing');
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } catch (error) {
        next(error); // pass the error to the error handling middleware
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            throw new Error('This is a protected route for students');
        }
        next();
    } catch (error) {
        next(error); // pass the error to the error handling middleware
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {
            throw new Error('This is a protected route for admins');
        }
        next();
    } catch (error) {
        next(error); // pass the error to the error handling middleware
    }
};
