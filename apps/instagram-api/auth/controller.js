const { User } = require("../../shared/models");
const jwt = require("jsonwebtoken");
const {SIGNIN} = require('./validators');

class AuthController {
    async signin(req, res) {
        const errors = await SIGNIN.validate(req.body);
        if(errors){
            return res.jsonError(errors);
        }

        const {username, password} = req.onlyKeys;
        let user = await User.findOne({ username }).select("+password");
        if (!user) {
            return res.jsonError({
                messages: {
                    username: "username is not valid"
                }
            });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err || !isMatch) {
                return res.jsonError({
                    messages: {
                        credential: "Username or password is incorrect"
                    }
                });
            }
        });
        user.password = undefined;
        const token = jwt.sign(user.toJSON(), process.env.JWT_KEY,{expiresIn: '1w'});
        return res.json({token});
    }
}

module.exports = new AuthController();
