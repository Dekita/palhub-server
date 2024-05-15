/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
// /rcon
// endpoint to run rcon commands!! :O

const DekRCON = require('../../utils/dek-rcon.js');

module.exports = class RconRouteController {
    static route = '/rcon';
    static async get(request, response) {
        response.status(405).type('text/plain').send("Method GET not allowed for this endpoint!");
    }

    static async post(request, response) {
        const {cmd, pwd=null} = request.body;

        if (!!!cmd) return response.status(400).json({error:"Invalid CMD"});

        if (pwd !== process.env.PALHUB_ADMIN_PASS) console.log('bad password');
        console.log('EXPECTED PW:', process.env.PALHUB_ADMIN_PASS);
        console.log('RECEIVED PW:', pwd);

        console.log('rcon api request:', {
            body: request.body,
            params: request.params, 
            query: request.query,
        });

        try {
            const result = await DekRCON.run(cmd, pwd);
            console.log('rcon api result:', result);
            response.status(200).json({result});
        } catch (error) {
            response.status(400).json({error});
        }

        // console.log('result:', result)
        // // response.status(200).type('text/plain').send(result);
        // const resultWithNewlines = result.replace(/\n/g, '<br>');
        // response.status(200).type('text/html').send(resultWithNewlines);
    }
};
