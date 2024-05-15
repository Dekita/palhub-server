/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
// 
// /run
// a basic post api endpoint, to trigger commands on the server
// 

const bent = require('bent');
const run = bent('POST', 'json', 200);

module.exports = class PingController {
    static route = '/run';

    static async post(request, response) {
        console.log("attempting to run 'run'")
        console.log('run api request:', {
            body: request.body,
            params: request.params, 
            query: request.query,
        });
        
        if (request.body.pwd !== process.env.PALHUB_ADMIN_PASS) {
            return response.status(401).json({error: "Incorrect credentials!"});
        }

        const result = await run('http://host.docker.internal:8080/', request.body);
        response.status(200).json({result});
        console.log('result:', result);
    }
};

