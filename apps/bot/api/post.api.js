const axios = require('axios');

const getPostByUrl = async (postUrl) => {
    const response = await axios.get(`${process.env.BASE_URL}/${postUrl}/?__a=1`);
    return response;
}

module.exports = {
    getPostByUrl
};