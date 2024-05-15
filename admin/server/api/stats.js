/*
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
*/

// const ControllerBase = require('./base');
const SysInfo = require('../../utils/dek/sysinfo');

// route controller for streams
module.exports = class StatController {
    static route = '/stats(/:id)?';

    static async get(request, response) {
        const valid_stats = {
            jitter: ['system.idlejitter'],
            load: ['system.load'],
            'cpu-perc': ['system.cpu', { options: 'percentage', group: 'avg' }],
            cpu: ['system.cpu'],
            ram: ['system.ram', { options: 'percentage' }],
            mem: ['mem.available'],
            swap: ['mem.swap'],
            ip: ['system.net'],
            io: ['system.io'],
            disk: ['disk.ops'],
            'disk-rw': ['disk.sdc'],
            storage: ['disk.space']
        };

        const duration = request.query.duration || '15 mins';
        if (!SysInfo.READABLE_DURATIONS[duration]) {
            return response.json({ error: 'invalid duration' });
        }
        // console.log('duration:', duration)
        // console.log('stats api request:', {
        //     body: request.body,
        //     params: request.params, 
        //     query: request.query,
        // });


        if (request.params.id !== null) {
            if (!valid_stats[request.params.id]) {
                return response.json({ error: 'invalid stat' });
            }
            const [stat, options] = valid_stats[request.params.id];
            const stat_args = [stat, duration, options];
            const stat_data = await SysInfo.fetchNetdataGraph(...stat_args);
            return response.json(stat_data);
        }

        // const perc_args = ['system.cpu', duration, { options: 'percentage' }];
        // const cpu_perc = await SysInfo.fetchNetdataGraph(...perc_args);
        // const perc_array = [];
        // for (const array of cpu_perc.label_vals) {
        //     for (const [index, value] of array.entries()) {
        //         perc_array[index] = perc_array[index] || 0;
        //         perc_array[index] += value;
        //     }
        // }
        // cpu_perc.label_keys = ['percentage'];
        // cpu_perc.label_vals = [perc_array];

        const stat_response = {};
        for (const stat_key of Object.keys(valid_stats)) {
            const [stat, options] = valid_stats[stat_key];
            const stat_args = [stat, duration, options];
            stat_response[stat_key] = await SysInfo.fetchNetdataGraph(...stat_args);
        }

        response.json(stat_response);
    }
};
