/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//helper functions
const { varInit,
  authenticateUser,
  getUserByEmail } = require('../lib/utils');

  module.exports = (router, db) => {

    router.get("/api/sites", (req, res) => {

      let db_connect = dbo.getDb("solar_flares");
      db_connect
        .collection("sites")
        .find()
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    });
  }

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
