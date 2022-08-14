# yac
Yet Another Calendar


Install / Run instructions
=====

- Fork / Download repo
- If using docker then run the following command
   - docker-compose up
- Without docker, read below on how to run
- Enter server folder and run the following commands
   - npm install (to install are dependencies)
   - node index.js

- Enter calendar folder and run the following commands
   - npm install (to install are dependencies)
   - npm start
   
- Front Runs on http://localhost:8000/   
- Backend/Server Runs on http://localhost:3000/


Troubleshooting:
=====

- Pool overlaps with other one on this address space
   - Solution #1: call `docker network prune` after calling it, please press y and then call `docker-compose up`
   - Solution #2: call `docker-compose down` and then call `docker network prune`, finally, call `docker-compose up`
- ERROR: for mongo_db_cont  Cannot start service mongo: network 3a8421f766626d0f8417f7de93cff19de064f2769b693cb6643c28c7b914dc09 not found
   - Solution #1: call `docker container rm service_name` and then call `docker-compose up`


Features:
=====

- Events are being displayed in 4 resolutions: day / week / month and a list
- Drag and drop / Resize  (change date / duration)
- Store to local MongoDB server 


About:
=====

- Author: Daniel Reznick
- Frontend: React
- Backend: Node.js
- DB: MongoDB
