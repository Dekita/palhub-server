/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/
const fs = require('fs');
const ini = require('ini');


// 
// /ini
// a basic post api endpoint, to trigger update of the server
// 

const bent = require('bent');
const run = bent('POST', 'json', 200);


function prepareDataForIni(data, default_data) {
    if (typeof data === 'boolean') {
        return data ? 'True': 'False';
    }
    if (!isNaN(Number(data)) && data.length) {
        return data; // is number
    }
    // stringy types: 
    return `"${data}"`;
}

module.exports = class INIUpdater {
    static route = '/ini';

    static async post(request, response) {
        console.log('ini api request:', {
            body: request.body,
            params: request.params, 
            query: request.query,
        });

        if (request.body.pwd !== process.env.PALHUB_ADMIN_PASS) {
            return response.status(401).json({error: "Incorrect credentials!"});
        }

        const ini_path = '/app/PalServer/Pal/Saved/Config/WindowsServer/PalWorldSettings.ini';
        const ini_file = await fs.promises.readFile(ini_path, 'utf-8');

        const update_var = (data, key_name, new_value) =>{
            const prop_regexp = new RegExp("(" + key_name + "=)([^,\\)]+)", "g");
            const matches = data.match(prop_regexp);
            console.log({key_name, matches});
            return data.replace(prop_regexp, `$1${new_value}`);
        }

        // const parsed_ini = ini.parse(ini_file);
        // const PalScript = parsed_ini['/Script/Pal'];
        // const {PalGameWorldSettings} = PalScript;
        // const {OptionSettings} = PalGameWorldSettings;
        // // replace the () around the OptionSettings values and parse into usable object
        // const ReplOptionSettings = OptionSettings.replace(/^\(|\)$/g, '').replace(/\,/g, "\n");
        // const OptionSettingsObject = ini.parse(ReplOptionSettings);

        let updated_ini = `${ini_file}`;
        // Object.entries(OptionSettingsObject).map(([key, value]) => {
        //     updated_ini = update_var(updated_ini, key, prepareDataForIni(request.body.ini[key], value))
        // })
        for (const [key, data] of Object.entries(request.body.ini)) {
            updated_ini = update_var(updated_ini, key, prepareDataForIni(data))
        }
        console.log('updated_ini:\n', updated_ini)
        fs.writeFileSync(ini_path, updated_ini, 'utf-8');



        // const parsed_ini = ini.parse(ini_file);
        // const PalScript = parsed_ini['/Script/Pal'];
        // const {PalGameWorldSettings} = PalScript;
        // const {OptionSettings} = PalGameWorldSettings;
        // // replace the () around the OptionSettings values and parse into usable object
        // const ReplOptionSettings = OptionSettings.replace(/^\(|\)$/g, '').replace(/\,/g, "\n");
        // const OptionSettingsObject = ini.parse(ReplOptionSettings);
        // Object.entries(OptionSettingsObject).map(([key, value]) => {
        //     OptionSettingsObject[key] = prepareDataForIni(request.body.ini[key]);
        // })
        // console.log(OptionSettingsObject);

        // PalGameWorldSettings.OptionSettings = `(${ini.stringify(OptionSettingsObject)})`

        // // Write the INI data to the file
        // fs.writeFileSync(ini_path, ini.stringify(parsed_ini), 'utf-8');



        // const result = await run('http://host.docker.internal:8080/', request.body);
        // response.status(200).json({result});
        // console.log('result:', result);

        response.status(200).json({result:true});
    }
};

