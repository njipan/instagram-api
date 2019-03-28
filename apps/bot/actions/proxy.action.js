module.exports = {
    process: (nightmare, proxy)=> {
        return new Promise((resolve) => {
            if(typeof proxy.proxy_username != 'undefined'){
                nightmare
                    .authentication(proxy.proxy_username, proxy.proxy_password)
                    .then(() => resolve(nightmare));
            }
            resolve(nightmare);
        });
    }
};
