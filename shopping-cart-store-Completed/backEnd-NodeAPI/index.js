const express = require('express');
const app = express();

const mysql = require('mysql2/promise');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const morgan = require('morgan');

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
        console.log(err);
        if (req.db) req.db.release();
        throw err;
    }
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
    try {

        const [products] = await req.db.query(
            `SELECT * FROM products `
        );

        res.json(products);


    } catch (err) {
        console.log('/products error', err);
    }
});


app.get('/products/:productCode', async (req, res) => {
    try {
        const [[products]] = await req.db.query(
            `SELECT * FROM products WHERE productCode = :productCode`,
            {
                productCode: req.params.productCode
            }
        );
        res.json(products)
    } catch (err) {
        console.log('productCode Error', err)
    }
});

app.get('/shipping', async (req, res) => {
    try {
        const [shippingOptions] = await req.db.query(
            `SELECT * FROM shippingcost`
        );

        res.json(shippingOptions);
    } catch (err) {
        console.log('Error in the Shipping GET', err);
    }
});



app.post('/registration', async function (req, res) {
    try {
        let customerreg;

        // Hashes the password and inserts the info into the `user` table
        await bcrypt.hash(req.body.passWord, 10).then(async hash => {
            try {
                [customerreg] = await req.db.query(`
                INSERT INTO customerreg( customerLastName, customerFirstName, phone, 
                    addressLine1, addressLine2, city, state, postalCode, userName, 
                    email, passWord)
                    VALUES (:customerLastName, :customerFirstName, :phone, 
                        :addressLine1, :addressLine2, :city, :state, :postalCode, :userName, 
                        :email, :passWord)
                `, {
                    customerLastName: req.body.customerLastName,
                    customerFirstName: req.body.customerLastName,
                    phone: req.body.phone,
                    addressLine1: req.body.addressLine1,
                    addressLine2: req.body.addressLine2,
                    city: req.body.city,
                    state: req.body.state,
                    postalCode: req.body.postalCode,
                    userName: req.body.userName,
                    email: req.body.email,
                    passWord: hash,
                });
                console.log('customerreg', customerreg)
            } catch (error) {
                res.json('Error creating customer');
                console.log('error', error)
            }
        });

        const encodedCustomer = jwt.sign(
            {
                customerID: customerreg.customerID,
                ...req.body
            },
            process.env.JWT_KEY
        );

        res.json({
            data: encodedCustomer,
            error: false,
            msg: ''
        });
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error, please try again'
        });
        console.log('err', err)
    }
});
app.post('/login', async function (req, res) {
    try {
        const [[customerreg]] = await req.db.query(`
            SELECT * FROM customerreg WHERE email = :email
        `, {
            email: req.body.email
        });

        if (!customerreg) {
            res.json({
                data: null,
                error: true,
                msg: 'Email not found'
            });
        }

        console.log(customerreg);
        const customerPassword = `${customerreg.passWord}`;

        console.log('customerPassword', customerPassword);
        console.log('customerPassword ctx', req.body.passWord);

        const compare = await bcrypt.compare(req.body.passWord, customerPassword);

        console.log('compare', compare);

        if (compare) {
            const payload = {
                customerID: customerreg.customerID,
                email: customerreg.email,
                customerFirstName: customerreg.customerFirstName,
                customerLastName: customerreg.customerLastName,
                role: 4
            }

            const encodedCustomer = jwt.sign(payload, process.env.JWT_KEY);


            res.json({
                data: encodedCustomer,
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
        console.log('Error in /login', err)
    }
})

app.use(async function verifyJwt(req, res, next) {

    if (!req.headers.authorization) {
        throw (401, 'Invalid authorization');
    }

    const [scheme, token] = req.headers.authorization.split(' ');

    console.log('[scheme, token]', scheme, ' ', token);

    if (scheme !== 'Bearer') {
        throw (401, 'Invalid authorization');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);

        console.log('payload1', payload)

        req.customerreg = payload;
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

//Getting the data stored in the shopping cart for one customer
app.get('/cart', async (req, res ) => {
    try {



        const [cart] = await req.db.query(
            `SELECT * FROM customercartorders WHERE email =:email`, {
            email: req.customerreg.email}
        );
        res.json(cart)
        console.log('cart get works');
    } catch (err) {
        console.log('Error getting shopping cart', err);
    }
})

app.get('/cart/shippingChoice', async (req, res ) => {
    try {

        const [shippingChoice] = await req.db.query(
            `SELECT * FROM orders WHERE email =:email`, {
            email: req.customerreg.email
        });

        res.json(shippingChoice)
        console.log('Shipping Choice get works');
    } catch (err) {
        console.log('Error getting shopping cart', err);
    }
})

app.get('/cart/itemTotal', async (req,res) => {
    try{
        const [[itemsTotal]]= await req.db.query(
        `SELECT SUM(productPrice) as itemsTotal FROM customercartorders WHERE email  =:email `,{
            email: req.customerreg.email
        });
        res.json(itemsTotal);
    }catch(err){
        console.log('Error Getting Item Total', err);
    }
})

app.get('/check-out-page/customerInfo', async (req,res) =>{
    try{
        const [customerInfo] =await req.db.query(
            `SELECT customerLastName,
                customerFirstName,
                phone,
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                userName,
                email FROM customerreg WHERE email=:email`,
            { email: req.customerreg.email
            })
        res.json(customerInfo);
    }catch(err){
        console.log('Getting Error CustomerInfo', err);
    }
})


//Items are inserted into the "cart" from each product page not the "cart" 
app.post('/products/:productCode', async (req, res) => {
    try {

        const [cart] = await req.db.query(
            `INSERT INTO customercartorders (
                productCode,
                productName,
                productPrice,
                email)
                VALUES (:productCode,:productName,:productPrice, :email)
                `, {
            productCode: req.body.productCode,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            email: req.customerreg.email,

        }
        )


        res.json({
            data: cart,
            error: false,
            msg: ''
        });
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error Adding Item'
        });
    }

})

//Deleting items in the cart. 
app.delete('/cart/:productCode', async (req, res) => {
    try {
        const [cart] = await req.db.query(
            `DELETE FROM customercartorders WHERE productCode = :productCode AND email =:email `, {
            productCode: req.params.productCode,
            email: req.customerreg.email
        });
        res.json({
            data: cart,
            error: false,
            msg: ''
        });
        console.log('Delete point in cart')

    } catch (err) {
        console.log('Error In the Delete', err);
        res.json({
            data: null,
            error: true,
            msg: " Error deleting Items"
        })
    }
})


app.delete('/shipping', async (req, res) => {
    try {
        const [shippingPickDelete] = await req.db.query(
            `DELETE FROM orders WHERE email = :email `, {
            email: customerreg.email,
        }
        );
        res.json({
            data: shippingPickDelete,
            error: false,
            msg: ''
        })
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error POST SHIPPING '
        });

    }
})



//shipping Choice on the shipping page
app.post('/shipping', async (req, res) => {
    try {
        const [shippingPick] = await req.db.query(
            `INSERT INTO orders (email, shippingType, shippingPrice)
            VALUES (:email,:shippingType,:shippingPrice)`, {
            email: req.customerreg.email,
            shippingType: req.body.shippingType,
            shippingPrice: req.body.shippingPrice
        });

        res.json({
            data: shippingPick,
            error: false,
            msg: ''
        })
    } catch (err) {
        res.json({
            data: null,
            error: true,
            msg: 'Error POST SHIPPING '
        });

    }
})



app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));


