
# Requirements
* needs docker + docker-compose on the system
* build within linux machine or wsl terminal

# Instructions
- (optional) make .env file and edit settings
```
cp env.default .env
vi .env
...
```

- (optional) force build image
```
docker compose build
```

- start the server
```
docker compose up -d
```

- (optional) check docker log
```
docker compose logs -f
```

- shutdown server
```
docker compose down
```

# Common Errors
If building on windows, you MUST be WITHIN a wsl environment & command terminal to build the container properly. I havent been able to build this properly from a windows command line. If you know why and can help, let me know <3
If you get the `unexpected permission` error when building, run `sudo chmod -R 755 ./server`.

