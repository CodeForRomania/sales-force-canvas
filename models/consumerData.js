var consumerData = {
    key: process.env.CUSTOMER_KEY,
    callbackUrl: 'https://'+process.env.HEROKU_APP_NAME+'.herokuapp.com/oauth/sfOauthCallback'
};

module.exports = exports =
{
    consumerData: consumerData
};
