console.log('loading app...');

const config = require('../config/main');
const express = require('express');
const next = require('next');
const chokidar = require('chokidar');
const path = require('path');
// const fs = require('fs');
// const UTILS = require('../dek/utils');

const app = next({ dev: config.dev_mode });
const handle = app.getRequestHandler();
const route_parser = require('./parser');

// const NetStat = require('../dek/netstat');
// const DB = require('../db/database');

console.log('loading express server...');

(async () => {
    try {
        await app.prepare();
        const server = express();

        console.log('loading api routes...');
        // setup api route parser
        // this allows custom api routes outwith the next environment
        let api_router = route_parser('api');

        // reload route parser on changes
        if (config.dev_mode) {
            // watch api route, and reload parser on change
            // this avoids the app needing rebooted on api change
            // note: app still gets rebooted when this file changes
            const api_path = path.join(__dirname, '../api');
            // watch api dir for changes using chokidar
            // native fs.watch has issues in docker container
            // todo: only reload changed files?
            const opts = { usePolling: true };
            const watcher = chokidar.watch(api_path, opts);
            const reload_api = (path, stats) => {
                console.log('\nreloading api routes!!');
                api_router = route_parser('api');
            };
            // removed 'add' as new files shouldnt trigger anything
            // until after being edited, and to stop multiple
            // reloads on system boot
            // watcher.on('add', reload_api);
            watcher.on('change', reload_api);
            watcher.on('unlink', reload_api);
        }

        // api route handling:
        server.use('/api', (req, res, next) => {
            api_router(req, res, next);
        });

        // serve generated media folder as static:
        // note: folder is mounted externally from docker-compose
        const media_path = path.join(__dirname, '../media');
        server.use('/media', express.static(media_path));

        // handle all other routes via next.js
        server.all('*', handle);

        // bind server to port:
        server.listen(config.internal_port, () => {
            console.log(`> Server running`);
        });
    } catch (exception) {
        throw exception;
    }
})();

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection:ERROR');
    console.error(error);
});


/**
* Calls when shutting down due to sigterm or sigint 
* ie: when the node.js process stops
* process.exitCode =0; doesnt work for docker containers
* and makes the application error with code 137?
* code 137 = out of memory - why?> lol
*/

// const NetStat = require('./netstat');
for (const signal_killer of ['SIGTERM','SIGINT']) {
    process.on(signal_killer, async shutdownSafely => {
        console.log('shutting down...');
        // NetStat.close();
        process.exit(0); 
    });
}
// some changes <3
