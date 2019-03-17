const mongoose = require("../../../shared/mongoose");

const AccountSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    like_per_day: {type: Number, default: 0 }
});

AccountSchema.pre('save', function(){
    this._id = mongoose.Types.ObjectId();
})

module.exports = mongoose.model("Account", AccountSchema);
