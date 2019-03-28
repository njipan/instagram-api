const mongoose = require("../../../shared/mongoose");

const ProxySchema = mongoose.Schema({
    ip: { type: String, unique: true },
    port: { type: String},
    username: {type: String},
    password: { type: String }
});

module.exports = mongoose.model("Proxy", ProxySchema);
