/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
// /ping
// a basic ping api endpoint, for pinging purposes
// consider this the hello world for api endpoints..

module.exports = class PingController {
    static route = '/express-ping';

    static async get(request, response) {
        // response.sendStatus(200).json({ping: 'pong'});
        response.json({ ping: 'pong' });
    }
};
