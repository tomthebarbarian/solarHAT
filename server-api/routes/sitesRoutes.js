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

const model = require('../db/seed/dataModel/model_seed')

module.exports = (router, dbo) => {

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

  router.get("/model", (req, res) => {
    const dbConn = dbo.getDb();
    dbConn
      .collection("dataModel")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      })
  });

  router.post('/sites', (req, res) => {
    console.log("from backend", req.body)
    const site = req.body

    const userId = req.session.user_id
    console.log("req session user ID:", userId);

    site.owner = userId

    console.log(site)

    const dbConn = dbo.getDb();
    dbConn.collection("sites").insertOne(site);

  })



  router.get('/sites/usage', (req, res) => {
    const dbConn = dbo.getDb();
    dbConn
      .collection("sites")
      .find()
      .sort({ usage_kWh: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      })
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
      .updateOne({ "_id": ObjectId(`${req.params.id}`) }, { $set: { ...site } }, { upsert: false })

    res.json(site)
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
      .deleteOne({ "_id": ObjectId(`${req.params.id}`) })
    res.json(site)
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
          siteData = { ...e }
          pvoutSum = 1000000
          cent_per_kWh = 0

          if (model[e.province]) {
            pvoutSum = model[e.province].pv_monthly_avg.reduce((prev, current) => prev + current)
            cent_per_kWh = model[e.province].cost_cents_avg
          }
          console.log(`---${e.province}---
            Sum[PV_out] ${pvoutSum * e.size_kW}
            cost c/kWh: ${cent_per_kWh}`)

          siteData.production = pvoutSum * e.size_kW
          siteData.net = (pvoutSum * e.size_kW) - e.usage_kWh
          siteData.cost = Math.round((e.size_kW * pvoutSum * cent_per_kWh * 100 / 100))
          siteData.name = e.name.toLowerCase()

          return siteData
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
  // module.exports = (router, dbo) => {

  //   router.get("/api/sites", (req, res) => {

  //     let db_connect = dbo.getDb("solar_flares");
  //     db_connect
  //       .collection("sites")
  //       .find()
  //       .sort({'consumption_kWh': -1})
  //       .toArray(function (err, result) {
  //         if (err) throw err;
  //         res.json(result);
  //       });
  //   });
  //   return router
  // }


// module.exports = (router, db) => {

//   router.get("/m", (req, res) => {

//     const id = 1;
//     let query = `SELECT id, name from categories;`;

//     console.log(query);


//     db.query(query)
//       .then(data => {
//         const categories = data.rows;
//         //res.send({categories})
//         const strquery = `SELECT items.name  as title,
//          items.description as description,
//         items.price, items.url, items.id,
//           categories.name as category ,
//           categories.id as catId FROM items
//            join categories on categories.id = category_id
//             where category_id = 1`;

//         return db.query(strquery)
//           .then(foodItem => {
//             const obj = Object.assign({}, { categories }, { foodItem: foodItem.rows })
//             //res.send(obj)
//             return obj;
//           });
//       })
//       .then(data => {
//         const templateVars = varInit(false, 200, 'customer', data);
//         // res.send(data);
//         res.json(templateVars);
//       }


//       )
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   router.get("/m/:id", (req, res) => {

//     const id = req.params.id;
//     console.log('=================================', id)
//     let query = `SELECT id, name from categories;`;

//     console.log(query);


//     db.query(query)
//       .then(data => {
//         const categories = data.rows;
//         //res.send({categories})
//         const strquery = `SELECT items.name as title,
//         items.description as description,
//         items.price, items.url, items.id,
//           categories.name as category ,
//           categories.id as catId FROM items
//            join categories on categories.id = category_id
//             where category_id = $1`;

//         return db.query(strquery, [id])
//           .then(foodItem => {
//             const obj = Object.assign({}, { categories }, { foodItem: foodItem.rows })
//             return obj;
//           });
//       })
//       .then(data => {
//         const templateVars = varInit(false, 200, 'customer', data);
//         //res.send(data);
//         res.json(templateVars);
//       }


//       )
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   const getCategoryItems = function (id) {
//     const strQuery = `SELECT * FROM items
//     JOIN categories ON categories.id = category_id
//     WHERE category_id = $1`;

//     return db
//       .query(strQuery, [id])
//       .then((dBres) => dBres.row)
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };
//   exports.getCategoryItems = getCategoryItems;

//   router.get("/items", (req, res) => {
//     let query = `SELECT * FROM items`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const items = data.rows;
//         res.json({ items });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });


//   router.get("/test", (req, res) => {

//     const id = 1;
//     let query = `SELECT id, name from categories;`;

//     console.log(query);


//     db.query(query)
//       .then(data => {
//         const categories = data.rows;
//         //res.send({categories})
//         const strquery = `SELECT items.name as title,
//          items.description as description,
//         items.price, items.url, items.id,
//           categories.name as category ,
//           categories.id as catId FROM items
//            join categories on categories.id = category_id
//             where category_id = 1`;

//         return db.query(strquery)
//           .then(foodItem => {
//             const obj = Object.assign({}, { categories }, { foodItem: foodItem.rows })
//             //res.send(obj)
//             return obj;
//           });
//       })
//       .then(data => {
//         const templateVars = varInit(false, 200, 'customer', data);
//         res.json(templateVars);
//       }


//       )
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   return router;
// };
