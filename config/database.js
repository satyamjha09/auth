const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB connected successfully");


    } catch (err) {

        console.error("DB connection error:", err.message);
        throw new Error("Failed to connect to database");
        
    }
};


