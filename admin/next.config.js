/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '',
    distDir: 'build',

    // creates standalone output for docker:
    output: 'standalone',

    // images: {
    //     domains: ['localhost']
    // },

    // allows hotreloading in docker when devmode <3
    // throws warning as not in 'allowed' properties
    // webpackDevMiddleware(config) {
    //     config.watchOptions = {
    //         aggregateTimeout: 300,
    //         poll: 1000,
    //     };
    //     return config;
    // },

    // set html page lang:en
    // i18n: {
    //     locales: ["en"],
    //     defaultLocale: "en",
    // },

    webpack(config) {
        if(process.env.NEXT_WEBPACK_USEPOLLING) {
            config.watchOptions = {
              poll: 500,
              aggregateTimeout: 300
            }
        }
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },

    // ignore key checks blah blah blah
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
