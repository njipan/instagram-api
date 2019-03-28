const configs = require('../../../configs');
exports.beforeSendHeaders = (details, cb) => {
    console.log(details);
    if(details.url === `${process.env.BASE_URL}${configs.headers.extract_from_url}`){
        const requestHeaders = {};
        for(let idx in configs.headers.items){
            let headerName = configs.headers.items[idx];
            let headerValue = details.headers[headerName];
            requestHeaders[headerName] = headerValue;
        }
        nightmare.requestHeaders = Object.assign(requestHeaders, {'Content-Type' : 'application/x-www-form-urlencoded'});
        console.log(requestHeaders);
    }
    cb({ cancel: false });
};

module.exports = exports;