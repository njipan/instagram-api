const parse = (details) => {
    let messages = {};
    details.forEach((item) => {
        if(typeof messages[item.path] !== 'undefined') return;
        messages[item.path] = item.message.replace('"','').replace('"','');
    });
    return messages;
};

module.exports = { parse }
