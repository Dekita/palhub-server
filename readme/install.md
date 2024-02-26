
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

Tail currently running images logs
```
docker compose logs -f
```

Shutdown all services
```
docker compose down
```

# Common Errors
If building on windows, you MUST be WITHIN a wsl environment & command terminal to build the container properly. I havent been able to build this properly from a windows command line. If you know why and can help, let me know <3
If you get the `unexpected permission` error when building, run `sudo chmod -R 755 ./server`.
