// const UTILS = require('../utils/dek/utils');
const fs = require('fs');
const path = require('path');
const express = require('express');
// const mongo_sanitize = require('mongo-sanitize');
const fileUpload = require('express-fileupload');

const freshRequire = require('../utils/dek/freshRequire');

module.exports = function parser(route) {
    const router = express.Router();

    const limit = '5mb'; //5e+6;// 5Mb (in bytes)

    router.use(express.json({ limit }));
    router.use(express.urlencoded({ limit, extended: true }));

    // for use when using mongodb
    // // ensures that req.params|body are sanitized
    // router.use((req, res, next) => {
    //     mongo_sanitize(req.params);
    //     mongo_sanitize(req.body);
    //     next();
    // });

    // handles receiving file uploads using express-fileupload
    router.use(
        fileUpload({
            // limits: { fileSize: 10e9 }, // 5gb max file
            createParentPath: true,
            tempFileDir: '/tmp/',
            useTempFiles: true,
            abortOnLimit: true,
        })
    );

    const ROUTE_ROOT = `${__dirname}/${route}`;
    const rdirectoryFiles = fs.readdirSync(ROUTE_ROOT);
    const routeFiles = rdirectoryFiles.filter((f) => f.endsWith('.js'));

    for (const file of routeFiles) {
        if (file === 'base.js') continue;
        console.log('api-file:', file);
        const route = freshRequire(`${ROUTE_ROOT}/${file}`);
        // const route = require(`${ROUTE_ROOT}/${file}`);
        const api_route = route.route || path.basename(file, '.js');
        for (const crudop of ['get', 'post', 'put', 'delete']) {
            if (route[crudop]) {
                router[crudop](api_route, async (req, res) => {
                    // console.log(`api:${crudop}: ${api_route}`);
                    await route[crudop](req, res);
                });
                console.log(`api:${crudop}: ${api_route}`);
            }
        }
    }
    return router;
};
