import { userModel } from "../models";
import { successHandler, errorHandler } from "../helper/responseHandler";
import {constants} from '../constant';
import {paginationHelper} from '../helper';

export const userListing = async (req, res) => {
    try {
        const pageData = paginationHelper.pagination(req);
        const result = await userModel.find({}).skip(pageData.offset).limit(pageData.limit);
        return successHandler(res, 200, constants.GET_USER, result);
    } catch (error) {
        return errorHandler(res, 500, constants.ERR_MSG);
    };
};
