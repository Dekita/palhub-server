# Local Development
When building locally for development, you should alter the main docker-compose.yml file to include the admin.dev.compose.yml file, rather tha admin.compose.yml. The .dev variant adds uses a slightly different configuration with additional env variables used by node+next..js to enable hot-reloading of the api endpoints outwith of next.js, as well as the actual next.js webpage (and its api routes)

This will create additional empty folders within the admin directory that are basically bind mounts for additional folders from other parts of the PalHUB::Server configuration. 