exports.statusResponse = () => {
    return (req, res, next) => {
        res.jsonSuccess = (data = {}) => {
            return res.send(Object.assign({ status: "success" }, data));
        }
        res.jsonError = (data = {}) => {
            return res.status(400).send(Object.assign({ status: "error" }, data));
        }
        next();
    }
}