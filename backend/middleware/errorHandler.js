export default function errorHandler(error, req, res, next) {
    console.log("Error", error.message)
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        msg: error.message
    })
}