# NODE / REACT: SCHOOL ADMINISTRATION WEB APPLICATION
The web application in this repository was developed as part of the 2nd semester of my Computer Science major.

### Disclaimer
- All names and other personal data with which this version is deployed, are randomly generated data and do not correspond to real persons.
- Due to the random generation of the data, in some cases, some of the mappings between entities will not make sense. i.e. Some Persons who appear as School students, also appear as school employees, or some Housholds appear withour addresses. The application is however fully functional if provided with a real-world dataset.


# INSTALLATION


PLATFORM INDEPENDENT PREREQUISITES
--------------
- Make sure that the following ports on your machine are free to be used by the containers: 8000, 8080, 3307, 3000

If containers started succesfully:
- The webapp is available in any modern browser under: (http://localhost:3000)
- phpAdmin is available in any modern browser under: (http://localhost:8080)
- There 3 verifications codes that can be used for registering the first 3 users: '123456', '234567' and '345678'.


MAC
--------------
1. Docker on MAC needs [Virtual Box](https://www.virtualbox.org/wiki/Downloads) to work. Make sure you have installed it.
2. Download and Install [Docker desktop app](https://docs.docker.com/desktop/mac/install/#install-interactively). Once the installation is finished run the Docker desktop app.
3. Download this repository as ZIP and unzip in your location of choice. 
4. Using the terminal navigate inside the unzipped folder where the docker-compose.yml is.
5. Run `docker-compose build` in the directory containing the docker-compose.yml file.
6. Run `docker-compose up -d` to start the containers in detouched mode.


WINDOWS
--------------
1. Enable the WSL 2 feature on Windows. For detailed instructions, refer to the [Microsoft documentation](https://docs.microsoft.com/en-us/windows/wsl/install).
2. Download an install [Docker desktop app](https://docs.docker.com/desktop/windows/install/). Once the installation is finished run the Docker desktop app.
3. Download this repository as ZIP and unzip in your location of choice. 
4. Run `docker-compose build` in the directory containing the docker-compose.yml file.
5. Run `docker-compose up -d` to start the containers in detouched mode.


LINUX
--------------
1. Download an install [Docker desktop app](https://docs.docker.com/desktop/linux/install/). Once the installation is finished run the Docker desktop app.
2. Download this repository as ZIP and unzip in your location of choice. 
3. Run `docker-compose build` in the directory containing the docker-compose.yml file.
4. Run `docker-compose up -d` to start the containers in detouched mode.


# UNIT TESTING (with MOCHA & CHAI)
- Mocha and Chai are included in the 'package.json' of the server.

### DISCLAIMERS
- The following instructions are for MacOS Users. Although the individual commands might differ, the logical steps can be applied for users of any common OS.

#### INSTRUCTIONS
1. Run `docker ps` in the terminal to make sure the containers are running and find out the name of the server container.
2. Run `docker exec -it school_node_server_container /bin/bash`to attach to the container's CLI.
* In case the error `Uncaught Error: listen EADDRINUSE: address already in use :::8000` is thrown, it means you need to stop the node server before going through the steps described below.
    1. Run `netstat -ntlp` to find the GID of the node server.
    2. RUN `kill -9 GID#` to kill node.
3. Once in the CLI simply run `npm test`to start testing with mocha.



Sources
---------
[Docker compose : NodeJS and MySQL app with React in a docker](http://www.bogotobogo.com/DevOps/Docker/Docker-React-Node-MySQL-App.php) 