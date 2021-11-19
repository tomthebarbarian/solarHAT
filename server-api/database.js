const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
	user: 'labber',
	password: 'labber',
	host: 'localhost',
	database: 'midterm',
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
	const strQuery = `SELECT * FROM users where email = $1`;
	return pool
		.query(strQuery, [email])
		.then((dBres) => dBres.row)
		.catch((err) => {
			console.log(err.message);
		});
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
	const strQuery = `SELECT * FROM users where id = $1`;

	return pool
		.query(strQuery, [id])
		.then((dBres) => dBres.row)
		.catch((err) => {
			console.log(err.message);
		});
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
	const { name, email, password } = user;
	const salt = bcrypt.genSaltSync(10);

	bcrypt
		.hash(password, salt)
		.then(function (hash) {
			const sqlQuery = `INSERT INTO
        users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`;
			return pool
				.query(sqlQuery, [name, email, hash])
				.then((dBres) => dBres.rows);
		})
		.catch((err) => {
			console.log(err.message);
		});
};

exports.addUser = addUser;

/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
	const queryParams = [];

	let strQuery = `
      SELECT properties.*, avg(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON property_id = properties.id\n`;

	if (options.city) {
		queryParams.push(`%${options.city}%`);
		strQuery += `WHERE city LIKE $${queryParams.length}\n`;
	}

	if (options.owner_id) {
		queryParams.push(options.owner_id);
		if (!strQuery.includes('WHERE')) {
			strQuery += `WHERE owner_id = $${queryParams.length}\n`;
		} else {
			strQuery += `AND owner_id = $${queryParams.length}\n`;
		}
	}

	if (options.minimum_price_per_night) {
		queryParams.push(options.minimum_price_per_night * 100);
		if (!strQuery.includes('WHERE')) {
			strQuery += `WHERE cost_per_night >= $${queryParams.length}\n`;
		} else {
			strQuery += `AND cost_per_night >= $${queryParams.length}\n`;
		}
	}

	if (options.maximum_price_per_night) {
		queryParams.push(options.maximum_price_per_night * 100);
		if (!strQuery.includes('WHERE')) {
			strQuery += `WHERE cost_per_night <= $${queryParams.length}\n`;
		} else {
			strQuery += `AND cost_per_night <= $${queryParams.length}\n `;
		}
	}

	strQuery += `GROUP BY properties.id \n`;

	if (options.minimum_rating) {
		queryParams.push(options.minimum_rating);
		strQuery += `HAVING avg(property_reviews.rating)  >= $${queryParams.length}\n`;
	}

	queryParams.push(limit);
	strQuery += `ORDER BY cost_per_night DESC, average_rating DESC
              LIMIT $${queryParams.length};`;

	return pool
		.query(strQuery, queryParams)
		.then((dbRes) => dbRes.rows)
		.catch((err) => {
			console.log(err.message);
		});
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
	const {
		owner_id,
		title,
		description,
		thumbnail_photo_url,
		cover_photo_url,
		cost_per_night,
		parking_spaces,
		number_of_bathrooms,
		number_of_bedrooms,
		country,
		street,
		city,
		province,
		post_code,
		active,
	} = property;

	const sqlQuery = `INSERT INTO
      properties ( owner_id,  title,  description,
        thumbnail_photo_url,  cover_photo_url,  cost_per_night,
        parking_spaces,  number_of_bathrooms,  number_of_bedrooms,
        country,  street,  city,  province,  post_code,  active)
      VALUES ($1, $2, $3,$4, $5, $6, $7, $8, $9,
              $10, $11, $12, $13, $14, $15)
      RETURNING *;`;

	const values = [
		owner_id,
		title,
		description,
		thumbnail_photo_url,
		cover_photo_url,
		cost_per_night,
		parking_spaces,
		number_of_bathrooms,
		number_of_bedrooms,
		country,
		street,
		city,
		province,
		post_code,
		active,
	];

	return pool
		.query(sqlQuery, values)
		.then((dBres) => dBres.rows)
		.catch((err) => {
			console.log(err.message);
		});
};
exports.addProperty = addProperty;

/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
	return getAllProperties(guest_id, limit);
};
exports.getAllReservations = getAllReservations;
