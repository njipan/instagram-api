class AuthMiddleware {
  check(req, res, next) {
    next();
  }
}
module.exports = new AuthMiddleware();
