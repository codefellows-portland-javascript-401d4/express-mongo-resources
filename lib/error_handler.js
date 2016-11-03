// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
    const code = err.error || 500;
    const error = code === 500 ? 'Internal Server Error' : err.error;
    console.error(err.error || err.message);
    res.status( code ).send({ error });
};
