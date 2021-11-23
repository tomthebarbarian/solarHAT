# MongoDB walkthrough
  Stores data in documents
    -BSON similar to JSON 
  Flexible
   -Doesnt need to follow a strict table

## SETUP

https://docs.mongodb.com/manual/administration/install-community/

### FOR MACOS
  Use homebrew to install mongodb 
   -brew tap mongodb/brew
   -brew install mongodb-community@5.0
### COMPASS

https://www.mongodb.com/try/download/compass
viewing application for databases 


##STARTING SERVER
###IN TERMINAL
  brew services start mongodb-community@5.0
  mongo

## USE
### CREATE DATABASE
  use <db_name>
    -this command also moves you into the database
    - the database won't appear in the list of your database ('show database' command) until theres
### CREATING COLLECTION
  db.createCollection('sites')

### INSERT DATA IN COLLECTION
  db.sites.insert({
    id:
    name: string
    location: [x, y]
    ....
  })
  OR TO INSERT MANY 
  db.sites.insertMany(
  [
  {
    name: 'site_name1',
    coord: [45.5462, -73.36564],
    prov_code: 'ON',
    consumption_kWh: 7.5,
    system_size_kW: 3.5,
  },
   {
    name: 'site_name2',
    coord: [40.5462, -70.36564],
    prov_code: 'ON',
    consumption_kWh: 8.5,
    system_size_kW: 8.5,
  },
  {

    name: 'site_name3',
    coord: [45.5017, -73.5673],
    prov_code: 'QC',
    consumption_kWh: 6.5,
    system_size_kW: 8.5,
  },
  {

    name: 'site_name4',
    coord: [49.2827, -123.1207],
    prov_code: 'BC',
    consumption_kWh: 5.5,
    system_size_kW: 8.5,
  }
  ]);
  
### QUERY DATA
  db.sites.find()
  db.sites.find().pretty --- formates BSON in terminal
    -shows all inserts in collection sites
  
  db.sites.find().sort({ name: 1 })
  -shows sites in alphabetical order (1 for ascending and -1 for descending )
  
### UPDATE DATA
  db.sites.update({ name: oldName},
    {
    name: newName
    location: [oldX, oldY]
    }
  ) ------ updates entire site

  upsert --- works as update or insert depending on if the desired post is found
  $set --- updates specific fields inside site

CHEAT SHEET
https://gist.github.com/bradtraversy/f407d642bdc3b31681bc7e56d95485b6  

## FETCHING DATA FROM MONGODB
  axios.get request linking to api in our client side app.js file

  db.users.insertMany([
{
    id: 1,
    name: 'Aj',
    email: 'aj@aj.com'
  },
  {
    id: 2,
    name: 'moose',
    body: 'moose@lake.com'
  },
  {
    id: 3,
    name: 'Hamza',
    email: 'hamza@hamza.com'
  }
])