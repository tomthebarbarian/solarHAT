# *Solar*Flares Project Setup

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `development` 
  - password: `development` 
  - database: `solar_flares`
3. Install dependencies: `npm i`
4. Reset database: `npm run seed`
  - Make sure mongo dB server is installed first!
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server

NOTE: 
  - make sure you run `npm i` and `npm run seed` in the same environment where both node and mongo are installed
  
6. Visit `http://localhost:8080/`
  - if you have a port conflict, it can be changed in `.env` file 

## Warnings & Tips

- use / modify place holders routes `adminRoutes.js` and `clientRoutes.js`

- Use the `npm run seed` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 12.x or above
- NPM 5.x or above
- mongo dB v4.x or above