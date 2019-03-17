const { User } = require("../../shared/models");
const {CREATE_USER, UPDATE_USER} = require('./validators');

class UserController {
  async index(req, res) {
    const users = await User.find({});
    return res.jsonSuccess({ data: users });
  }

  async store(req, res) {
    const errors = await CREATE_USER.validate(req.body);
    if(errors){
        return res.jsonError(errors);
    }
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    user.password = undefined;
    return res.jsonSuccess({ data: user });
  }

  async show(req, res) {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    return res.jsonSuccess({ data: user });
  }

  async update(req, res) {
    const id = req.id;
      const errors = await UPDATE_USER.validate(req.body);
      if(errors){
          return res.jsonError(errors);
      }
    const user = await User.findOneAndUpdate(
      { _id: id },
      Object.assign({}, req.onlyKeys),
      { new: true }
    ).select("-_id -__v");
      user.password = undefined;
    return res.jsonSuccess({ data: user });
  }

  delete(req, res) {
    const id = req.id;
    User.findOneAndDelete({ _id: id }, (err, user) => {
      if (!err) {
          user.password = undefined;
        return res.jsonSuccess({ data: user });
      }
    });
  }
}

module.exports = new UserController();
