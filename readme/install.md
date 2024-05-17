# Requirements
- needs docker + docker-compose on the system
- build within linux machine or wsl terminal


# Instructions
Clone the repository
```
git clone https://github.com/Dekita/palhub-server.git
```

Enter newly cloned directory
```
cd palhub-server
```

Copy .env file and edit settings
```
cp .default.env .env
vi .env
```

Launch the image (or perform initial build) and start all services. Use -d to start 'detatched', which will allow you to exit the console without stopping the container. 
```
docker compose up -d
```

Force rebuild the image
```
docker compose up --build --force-recreate
```

Launch the minimal version / specify alternative compose file:
```
docker compose -f docker-compose.minimal.yml --build
```


Tail currently running images logs
```
docker compose logs -f
```

Shutdown all services
```
docker compose down
```

## The Launcher Script
Included in the project is a launcher script; `launcher.sh`, that is designed to start an additional server on port 8080 that is used for the running container to interface with, to run predefined commands on the underlying machine, to fully update the palhub::server framework (updates repo, and rebuilds containers).

When the containers are started using the launcher script, additional options will be usable directly within the admin panel for stopping, restarting, and updating all container images used for the framework. 

To start the containers with the launcher script, simply make it executable, and run it;
```
chmod +x ./launcher.sh
chmod +x ./launcher/*
./launcher.sh
```


# Common Errors
If building on windows, you MUST be WITHIN a wsl environment & command terminal to build the container properly. I havent been able to build this properly from a windows command line. If you know why and can help, let me know <3
If you get the `unexpected permission` error when building, run `sudo chmod -R 755 ./server`.
