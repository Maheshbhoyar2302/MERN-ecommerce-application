const monogoose = require("mongoose")
const validator = require("validator")

const userSchema = new monogoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 char"],
        minLength: [4, "Name should have more than 4 char"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate : [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than a 8 char"],
        //when we request for user : password is not given
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

module.exports = monogoose.model("User", userSchema)