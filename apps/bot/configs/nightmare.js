const config = {
    show : process.env.NIGHTMARE_SHOW,
    gotoTimeout: 120000
};
if(process.env.NIGHTMARE_DEVTOOLS){
    config.openDevTools = { detach : true }
}
module.exports = config;