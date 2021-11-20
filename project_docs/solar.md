# Dashboard for solar panel installation management
all services provided 
request additional information

construction managers

# What's the problem?
Getting seperate data feeds
Need an aggregate view of all the data

## Stories
- just for management for now

- Add installations, edit installations, delete installation
- See all points
- See individual marker details


## Sidebar with views
Sites index
  -map view 
  -graph view 
Add Client (Render Form) 
Add site (Render Form) 

site details 
<!-- ### Management -->

## Needed Components
- Sidebar
  - Sites index Map
    - Markers
      - Marker Infobox
  - Sites index Graph
    some aggregate graphs

- Site Details 
  - Site Detail Chart

- Button

## TEMPLATE DATA in json, then decide on Mongo vs Psql
Sites = {
  id: int,
  client_id: int (FK),
  name: string,
  location: [x, y],
  progress: integer,
  <!-- *weather: points to weather api, -->
  <!-- sexy other data -->
}

### Marketing
- put in all the names of the disparate datasets you want to integrate

Clients = {
  id: int,
  name: str,
}

<!-- 
users = {
  id: int,
  name: str,
  accesslevel/type: str,
  usermame: str,
  password: str,
} 
-->

- get api/routes
## Routes
- Just 1 route for now, sites

- get root
- get map
- get/put/post/delete map/maker:id
- get details

- Then make other routes as needed

- DB
MONGO

### Weather information


# Stretch ------------------------------
- Clients View
- Crew form

## Clients
limited view compared to total. 


#### Crews reports
some safety information
Assessment of the crews

- Hosting 
- Weather api 

