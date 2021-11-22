# solarFlares data structure

```js
Users = {

  _id: {
    _id: 'mongo_generated',

    name: 'franics',
    email: 'francis@solarflares.com',
    password: 'potatoes',

    sites: []
  }

}


Sites = {
  _id: {
    _id: 'mongo_generated',

    name: 'LHL_solar',
    coord: [45.5017, -73.5673],
    prov_code: 'QC',
    consumption_kWh: 7.5,
    system_size_kW: 8.5,
  }
}

Solar_data = {

  production_monthly_avg: {
    //index 0 is Jan, Feb, ...., Dec
    ON: [66, 92, 109, 115, 119, 124, 125, 118, 104, 86, 56, 52],
    QC: [76, 106, 124, 118, 117, 115, 117, 114, 98, 80, 59, 60]

  },

  cost_cents_avg: {
    MB: 9.9,
    QC: 7.3,
    SK: 18.1,
    AB: 16.6,
    ON: 13,
    NB: 12.7,
    PE: 17.4,
    NU: 37.5,
    NS: 17.1,
    NT: 38.2,
    BC: 12.6,
    YT: 18.7,
    NL: 13.8
  }

}
```
