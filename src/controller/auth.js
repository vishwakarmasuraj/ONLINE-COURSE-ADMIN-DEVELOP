import { userModel } from "../models";
import { successHandler, errorHandler } from "../helper/responseHandler";
import {constants} from '../constant'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { sendMail } from "../helper/email";
import Handlebars from "handlebars";

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

export const forgotPassword = async (req, res) => {
    try {
        const getEmail = await userModel.findOne({email: req.body.email});
        if (!getEmail){
            return errorHandler(res, 404, constants.FORGOT_PASS_EMAIL_NOT_FOUND);
        }
        const resetPasswordToken = jwt.sign({email: getEmail.email}, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRE_IN
        })
        await userModel.updateOne({email: req.body.email}, {$set: {resetPasswordToken}});
        let htmlRequest = await fs.readFileSync(`${__dirname}/../../emailTemplate/forgotPassword.html`, 'utf8');
        let template = Handlebars.compile(htmlRequest);
        const replacements = {
            token: `http://localhost:3000/auth/reset-password/${resetPasswordToken}`
        };
        const htmlToSend = template(replacements);
        const options = {
            from: process.env.FROM_EMAIL,
            to: req.body.email,
            subject: constants.EMAIL_SUB_PASS,
            html: `${htmlToSend}`
        };
        await sendMail(options);
        return successHandler(res, 200, constants.FORGOT_PASSWORD_SUCCESS_MSG);
    } catch (error) {
        return errorHandler(res, 500, constants.ERR_MSG);
    };
};
