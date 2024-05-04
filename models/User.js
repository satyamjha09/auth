const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Regular expression for validating email addresses
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email format"
        }
    },
    

    password:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:["Admin", "Student" , "Visitor"],
        default: "Visitor",
    },

});



module.exports = mongoose.model("user" , userSchema);