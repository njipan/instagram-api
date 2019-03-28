const mongoose = require("../../../shared/mongoose");

const AccountSchema = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    total_like: {type: Number, default: 0 },
    total_comment: {type: Number, default: 0 }
});

module.exports = mongoose.model("Account", AccountSchema);
