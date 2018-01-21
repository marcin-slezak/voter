# voter
Learning project using react/redux/nodejs stack. It's simple polling application

## Intro
Voter is simple polling application created to refresh knowledge about redux/react/node stack. It will be company internal tool to create surveys and vote by employees. Everyone can add own create own poll, add option to any poll and vote. For now only simple local authentication is implemented. Application is still **under development** so it's not recommended to use it anywhere (yet).

## File Structure
Project could be split into separate 2 projects (with own package.json, modules and gitignore):
- voter-front - SPA using react/redux/material-ui, bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
- voter-backedn - nodejs rest backend using expressjs and sqlite as storage

Because for now it's learning project it was connected together to make setup easier. package.json from main folder contains only "concurrently" to run fronted and backend app using one command `npm start`

## Instalation (development environment)
- you need node and npm installed
- clone repository
- run command `npm install` in main folder, voter-backend and voter-front 
- init databse with example data, go to voter-backend/cmdUtils and run: `node createDatabase`
- in main folder run command: `npm start`
