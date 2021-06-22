//Express node framework to make endpoints and for the middleware
const express = require('express');
const app = express();
//Mysql database driver 
const mysql = require('mysql2/promise');
// bodyParser parses JSON from incoming post and put requests
const bodyParser = require('body-parser');
//bcrypt is used for encoding and decoding passwords
const bcrypt = require('bcrypt');
//JWT is used for authentication, 
//The token is composed of a header, a payload, and a signature. 
const jwt = require('jsonwebtoken');
//Cross-Origin Resource Sharing (CORS) is a protocol 
//that enables scripts running on a browser client to interact with resources from a different origin. 
const cors = require('cors');

//TroubleShooting Logger
const morgan = require('morgan');
const { query } = require('express');

//.env loaded file
require('dotenv').config();
const port = process.env.PORT;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(morgan('short'));

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


app.use(cors());
app.use(bodyParser.json());

app.post('/register', async function (req, res) {
    try {
        let user;

        // Hashes the password and inserts the info into the `user` table
        await bcrypt.hash(req.body.password, 10).then(async hash => {
            try {
                [user] = await req.db.query(`
            INSERT INTO user (firstName,lastName,email,password)
            VALUES ( firstName, :lastName,:email, :password);
          `, {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                });

                console.log('user', user)
            } catch (error) {
                console.log('error', error)
            }
        });

        const encodedUser = jwt.sign(
            {
                userId: user.id,
                ...req.body
            },
            process.env.JWT_KEY
        );

        res.json({
            data: encodedUser,
            error: false,
            msg:''
        });
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error creating the authentication token'
        });
        console.log('err', err)
    }
});

app.post('/log-in', async function (req, res) {
    try {
        const [[user]] = await req.db.query(`
        SELECT * FROM user WHERE email = :email
      `, {
            email: req.body.email
        });

        if (!user) {
            res.json({
                data: null,
                error: true,
                msg: 'Email not found'
            });
        }


        const userPassword = `${user.password}`


        const compare = await bcrypt.compare(req.body.password, userPassword);


        if (compare) {
            const payload = {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: 4
            }

            const encodedUser = jwt.sign(payload, process.env.JWT_KEY);

            res.json({
                data: encodedUser,
                error: false,
                msg: ''
            })
        } else {
            res.json({
                data: null,
                error: true,
                msg: 'Password not found'
            });
        }
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error Logging In'
        });
        console.log('Error in /log-in', err)
    }
})

app.use(async function verifyJwt(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw (401, 'Invalid authorization');
        }

        const [scheme, token] = req.headers.authorization.split(' ');

        console.log('[scheme, token]', scheme, ' ', token);

        if (scheme !== 'Bearer') {
            throw (401, 'Invalid authorization');
        }


        const payload = jwt.verify(token, process.env.JWT_KEY);

        console.log('payload', payload)

        req.user = payload;
    } catch (err) {
        if (err.message && (err.message.toUpperCase() === 'INVALID TOKEN' || err.message.toUpperCase() === 'JWT EXPIRED')) {

            req.status = err.status || 500;
            req.body = err.message;
            req.app.emit('jwt-error', err, req);
        } else {

            throw ((err.status || 500), err.message);
        }
        console.log(err)
    }

    await next();
});

app.get('/emails', async (req, res) => {
    try {
        res.json('This works ', req.user)
        const [emails] = await req.db.query(`SELECT * FROM email WHERE recipient =:userEmail`,
            {
                userEmail: req.user.email
            }
        );

        res.json({
            data: emails,
            error: false,
            msg: ''
        });
    } catch (err) {
        res.json(
            {
                data: null,
                error: true,
                msg: 'Error in emails'
            })
        console.log('emails', err)
    }
})

app.put('/sent-email', async (req, res) => {
    try {
        await req.db.query(
            `INSERT INTO email(
                sender,
                recipient,
                subject,
                body,
                time_stamp as timeStamp)
            VALUES(:sender,:recipient,:subject,:body,NOW())
            )`, {
            sender: req.body.sender,
            recipient: req.body.recipient,
            subject: req.body.subject,
            body: req.body.body
        }
        )
        console.log('/sent-email');
        res.json('/sent-email works')
    } catch (err) {
        console.log('error in sent-email', err);
        req.json('Error in sending email')
    }
})
app.post('', async (req, res) => {
    try {

    } catch (err) {

    }
})

app.delete('', async (req, res) => {
    try {

    } catch (err) {

    }
})

app.listen(port, () => console.log(`fake gmail clone listening at http://localhost:${port}`));