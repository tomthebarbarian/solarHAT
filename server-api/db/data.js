
const users = {

  1: {
    1: 'mongo_generated',

    name: 'hamza',
    email: 'hamza@hamza.com',
    password: 'hamza',

    sites: [4]
  },
  2: {
    2: 'mongo_generated',

    name: 'francis',
    email: 'francis@francis.com',
    password: 'francis',

    sites: [3]
  },
  3: {
    3: 'mongo_generated',

    name: 'TOM',
    email: 'tom@tom.com',
    password: 'tom',

    sites: [2]
  },
  4: {
    4: 'mongo_generated',

    name: 'aj',
    email: 'aj@smartnvm.com',
    password: 'aj',

    sites: [1]
  },

}


const sites = {
  1: {
    1: 'mongo_generated',

    name: 'site_name',
    coord: [45.5462, -73.36564],
    prov_code: 'ON',
    consumption_kWh: 7.5,
    system_size_kW: 8.5,
  },
  2: {
    2: 'mongo_generated',

    name: 'site_name',
    coord: [40.5462, -70.36564],
    prov_code: 'ON',
    consumption_kWh: 7.5,
    system_size_kW: 8.5,
  },
  3: {
    3: 'mongo_generated',

    name: 'site_name',
    coord: [45.5017, -73.5673],
    prov_code: 'QC',
    consumption_kWh: 7.5,
    system_size_kW: 8.5,
  },
  4: {
    4: 'mongo_generated',

    name: 'site_name',
    coord: [49.2827, -123.1207],
    prov_code: 'BC',
    consumption_kWh: 7.5,
    system_size_kW: 8.5,
  },
}

const dataModel = {

  //index 0 is Jan, Feb, ...., Dec
  production_monthly_avg: {
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

module.exports = { users, sites, dataModel }
