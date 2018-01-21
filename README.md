# voter
It's simple polling application created to refresh knowledge about redux/react/nodejs tools.

## Intro
It will be company internal tool to create surveys and count employees votes. Everyone can create own poll, add options nd vote. For now only simple local authentication is implemented. Application is still [**under development**](https://github.com/marcin-slezak/voter/projects/1) so it's not recommended to use it anywhere (yet).

## File Structure
Project could be split into 2 separate projects (with own package.json files, modules and gitignore):
- voter-front - SPA using react/redux/material-ui, bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
- voter-backedn - nodejs rest backend using expressjs and sqlite as storage

It was connected together to make setup easier. package.json from main folder contains only "concurrently" to run fronted and backend app using one command `npm start`. 

## Instalation (development environment)
- you need node and npm installed
- clone repository
- run command `npm install` in main folder, voter-backend and voter-front 
- init databse with example data, go to voter-backend/cmdUtils and run: `node createDatabase`
- in main folder run command: `npm start`

## Screenshots

Register:

![Login Page screenshot](/docs/screenshots/1.png?raw=true)

Main screen view:

![Logged user view screenshot](/docs/screenshots/2.png?raw=true)

Poll view:

![Poll view screenshot](/docs/screenshots/3.png?raw=true)
