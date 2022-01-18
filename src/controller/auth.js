import { userModel } from "../models";
import { successHandler, errorHandler } from "../helper/responseHandler";
import {constants} from '../constant'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userSignup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND);
        const user = await new userModel(req.body);
        await user.save();
        return successHandler(res, 201, constants.SIGNUP_SUCCESS)
    } catch (error) {
        console.log(error)
        return errorHandler(res, 500, constants.ERR_MSG)
    };
};

const generateToken = (user) => {
    return jwt.sign({data: user}, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    });
};

export const userLogin = async (req, res) => {
    try {
        const data = await userModel.findOne({email: req.body.email});
        if (!data){
            return errorHandler(res, 404, constants.LOGIN_EMAIL_ERR);
        };
        const checkPassword = await bcrypt.compare(req.body.password, data.password)
        if (!checkPassword){
            return errorHandler(res, 400, constants.LOGIN_WRG_PASSWORD);
        }else {
            return successHandler(res, 200, constants.LOGIN_SUCCESS,{
                token: generateToken(data),
                data
            });
        };
    } catch (error) {
        return errorHandler(res, 500, constants.ERR_MSG);
    };
};
