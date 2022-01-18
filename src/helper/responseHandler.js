export const successHandler = (res, statusCode, message, result) => {
    res.status(statusCode).json({message, result});
};

export const errorHandler = (res, statusCode, message, error) => {
    res.status(statusCode).json({message, error});
};
