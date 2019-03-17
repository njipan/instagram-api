class IdMiddleware {
    check(req, res, next) {
        const id = req.params.id || "";
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.send({
                data: null
            });
        }
        req.id = id;
        next();
    }
}
module.exports = new IdMiddleware();
