const notFoundHandler = (_req, _res, next) => {
    const error = new Error('Resources Not Found')
    error.status = 404;
    next(error);
};

const errorHandler = (error, _req, res, next) => {
    if (error.status) {
        return res.status(error.status).json({
            message: error.message
        })
    }
    res.status(500).json({ message: 'Something Went Wrong' })
}

module.exports = {
    notFoundHandler,
    errorHandler
}