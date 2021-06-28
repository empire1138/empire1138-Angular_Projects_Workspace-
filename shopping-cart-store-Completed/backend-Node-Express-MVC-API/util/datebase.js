const mysql = require('mysql2');
const express = require('express');
const app = express();

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


app.use(async function mysqlConnection(req, res, next) {
    try {
        req.db = await pool.getConnection();
        req.db.connection.config.namedPlaceholders = true;

        // Traditional mode ensures not null is respected for un-supplied fields, ensures valid JavaScript dates, etc.
        await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        await req.db.query(`SET time_zone = '-8:00'`);

        await next();

        req.db.release();
    } catch (err) {
        // If anything downstream throw an error, we must release the connection allocated for the request
        console.log(err)
        if (req.db) req.db.release();
        throw err;
    }
});

module.exports = pool.promise();
