export const pagination = ({query}) => {
    const {currentPage = 1, limit = 5, search, userType} = query
    const offset = (currentPage - 1) * limit;
    return {limit, offset, search, userType}
};