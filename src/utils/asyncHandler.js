const asyncHandler = (requestHandler) => {

    return async (req, res, next) => {
        await Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err);
        });
        // try {
        //     requestHandler(req, res, next);
        // } catch (err) {
        //     next(err);
        // }
    };
};

export default asyncHandler;

// const asyncHandler = (requestHandler) => {
//     async (req, res, next) => {
//         try {
//             await requestHandler(req, res, next)
//         } catch (err) {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message || "Internal Server Error"

//             })
//         }
//     };
// };

// export { asyncHandler };
