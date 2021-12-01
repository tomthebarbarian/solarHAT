/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//helper functions
const { varInit,
  authenticateUser,
  getUserByEmail } = require('../lib/utils');
const { ObjectId } = require("bson");
const _ = require('lodash')

const model = require('../db/seed/dataModel/model_seed');
const { response } = require('express');


const calcModel = (e) => {
  siteData = { ...e }
  pvoutSum = 1000000
  cent_per_kWh = 0

  if (model[e.province]) {
    pvoutSum = model[e.province].pv_monthly_avg.reduce((prev, current) => prev + current)
    cent_per_kWh = model[e.province].cost_cents_avg
  }
  console.log(`${e.province}
      Sum[PV_out] ${pvoutSum * e.size_kW}
      cost c/kWh: ${cent_per_kWh}`)

  siteData.production = pvoutSum * e.size_kW
  siteData.net = pvoutSum * e.size_kW - e.usage_kWh
  const costSavings = Math.round((siteData.net * -1.35 * cent_per_kWh / 100))
  siteData.eCosts = costSavings
  siteData.name = e.name.toLowerCase()
  siteData.model = model[e.province]

  siteData.prod = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 }).format(pvoutSum * e.size_kW);
  siteData.nett = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 }).format(pvoutSum * e.size_kW - e.usage_kWh);
  siteData.usage = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 }).format(e.usage_kWh);
  siteData.size = new Intl.NumberFormat('en-CA', { minimumFractionDigits: 1 }).format(e.size_kW);
  siteData.cost = Intl.NumberFormat('bn', { style: 'currency', currency: 'USD', currencySign: 'accounting' }).format(costSavings)

  return siteData
}

module.exports = (router, dbo) => {


  router.get('/u/sites/:id', (req, res) => {

    const userId = req.session.user_id;
    console.log("req session user ID:", userId);


    const param = req.params.id
    console.log('sort By', param)

    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .find({ owner: param })
      .toArray(function (err, result) {
        if (err) throw err;

        const data = result.map(e => {
          return calcModel(e)

        })

        const sorted = _.sortBy(data, ['name'])
        console.log(sorted)
        res.json(sorted);

      })

  })

  router.get("/sites", (req, res) => {
    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      })
  });

  router.post('/sites/new/', (req, res) => {
    console.log("from backend", req.body)
    const site = req.body

    const userId = req.session.user_id;
    console.log("req session user ID:", userId);

    site.owner = userId

    console.log(site)

    const dbConn = dbo.getDb();
    dbConn.collection("sites").insertOne(site);

  })

  router.post("/sites/edit/:id", (req, res) => {
    const site = req.body
    console.log('--------POST: [param]:', req.params.id)
    console.log('--------POST: [site]:', site)
    delete site._id
    site.coord = [Number(site.coord[0].toFixed(6)), Number(site.coord[1].toFixed(6))]
    for (const key in site) {
      if (!isNaN(site[key])) {
        site[key] = Number(site[key])
      }
    }
    console.log('--------POST: [site]:', site)

    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .updateOne({ "_id": ObjectId(req.params.id) }, { $set: { ...site } }, { upsert: false }, function (err, result) {
        if (err) throw err;
        res.send(result)
      })


  });


  router.post("/sites/delete/:id", (req, res) => {
    const site = req.body
    console.log('--------POST: [param]:', req.params.id)
    console.log('--------POST: [site]:', site)
    delete site._id
    // console.log('--------POST: [site]:', site)

    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .deleteOne({ "_id": ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        res.send(result)
      })
  });


  router.get('/sites/s/:id', (req, res) => {
    const param = req.params.id
    console.log('---sort By----', param)

    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;


        const data = result.map(e => {
          return calcModel(e)
        })

        const sorted = _.sortBy(data, [param])
        asc = ['usage_kWh', 'name']
        if (!asc.includes(param))
          return res.json(sorted.reverse().slice(0, 10));

        res.json(sorted.slice(0, 10));

      })

  })


  return router;

}
