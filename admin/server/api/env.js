/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
const fs = require('fs');
const dotenv = require('dotenv');

function updateENV(prop_name='', new_value='', env_path='') {
    const env_content = fs.readFileSync(env_path, 'utf8');
    const prop_regexp = new RegExp(`^(${prop_name}\\s*=\\s*).*?$`, 'm');
    const updated_env = env_content.replace(prop_regexp, `$1${new_value}`);
    fs.writeFileSync(env_path, updated_env);
}

function readENV(env_path) {
    const env_content = fs.readFileSync(env_path, 'utf8');
    const env_configs = dotenv.parse(env_content);
    return env_configs;
}


// 
// /env
// a basic post api endpoint, to trigger update of the server
// 

const bent = require('bent');
const run = bent('POST', 'json', 200);

module.exports = class ENVUpdater {
    static route = '/env';

    static async post(request, response) {
        console.log('env api request:', {
            body: request.body,
            params: request.params, 
            query: request.query,
        });

        if (request.body.pwd !== process.env.PALHUB_ADMIN_PASS) {
            return response.status(401).json({error: "Incorrect credentials!"});
        }

        const env_path = "/app/mounted-env.env";
        const env_content = fs.readFileSync(env_path, 'utf8');

        const update_var = (env_data, prop_name, new_value) =>{
            const prop_regexp = new RegExp(`^(${prop_name}\\s*=\\s*).*?$`, 'm');
            return env_data.replace(prop_regexp, `$1${new_value}`);
        }

        let updated_env = `${env_content}`;
        for (const [key, data] of Object.entries(request.body.env)) {
            console.log('writing:', key, data);
            updated_env = update_var(updated_env, key, data)
        }
        fs.writeFileSync(env_path, updated_env);
        response.status(200).json({result:true});



        // const result = await run('http://host.docker.internal:8080/', request.body);
        // response.status(200).json({result});
        // console.log('result:', result);

    }
};

