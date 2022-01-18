import { Schema, model } from "mongoose";

const userModel = new Schema ({
    fullName: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    },
    confirmPassword: {
        type: Schema.Types.String
    },
    resetPasswordToken: {
        type: Schema.Types.String
    },
    status: {
        type: Schema.Types.String,
        enum: ['active', 'inactive', 'admin', 'superadmin']
    }
}, {timestamps: true})

module.exports = model('User', userModel, 'User')

