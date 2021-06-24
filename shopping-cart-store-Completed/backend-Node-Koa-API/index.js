

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('cors');
const json = require('koa-json')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(logger());

//const mysql = require('koa-mysql');
const mysql = require('mysql2/promise');

const port = process.env.PORT;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(async function mysqlConnection(ctx, next) {
    try {
        ctx.state.db = await pool.getConnection();
        ctx.state.db.connection.config.namedPlaceholders = true;

        await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        await ctx.state.db.query(`SET time_zone = '-8:00'`);

        await next();

        ctx.state.db.release();
    } catch (error) {
        if (ctx.state.db) ctx.state.db.release();
        throw error;
    }
})

//app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(json())
router.get('/', async ctx => {
    try {

        const [products] = await ctx.state.db.query(
            `SELECT * FROM products `
        );
        ctx.body = { products };
    } catch (err) {
        console.log('/products error', err)
    }
});

router.get('/products/:productCode', async ctx => {
    try {
        const [[products]] = await ctx.state.db.query(
            `SELECT * FROM products WHERE productCode =:productCode`,
            {
                productCode: ctx.params.productCode
            }
        );
        ctx.body = { products }
    } catch (err) {
        console.log('productCodeID Error', err)
    }
})


router.get('/shipping', async ctx => {
    try {
        const [shippingOptions] = await ctx.state.db.query(
            `SELECT * FROM shippingcost `
        );
        ctx.body = { shippingOptions }
    } catch (err) {
        console.log('Error in the shipping Get', err)
    }
})


app.use(bodyParser());
router.post('/registration', async ctx => {

    try {
        let customerreg;

        // Hashes the password and inserts the info into the `user` table
        await bcrypt.hash(ctx.request.body.passWord, 10).then(async hash => {
            try {
                [customerreg] = await ctx.state.db.query(`
                INSERT INTO customerreg( customerLastName, customerFirstName, phone, 
                    addressLine1, addressLine2, city, state, postalCode, userName, 
                    email, passWord)
                    VALUES (:customerLastName, :customerFirstName, :phone, 
                        :addressLine1, :addressLine2, :city, :state, :postalCode, :userName, 
                        :email, :passWord)
                `, {
                    customerLastName: ctx.request.body.customerLastName,
                    customerFirstName: ctx.request.body.customerFirstName,
                    phone: ctx.request.body.phone,
                    addressLine1: ctx.request.body.addressLine1,
                    addressLine2: ctx.request.body.addressLine2,
                    city: ctx.request.body.city,
                    state: ctx.request.body.state,
                    postalCode: ctx.request.body.postalCode,
                    userName: ctx.request.body.userName,
                    email: ctx.request.body.email,
                    passWord: hash,
                });
                console.log('customerreg', customerreg)
            } catch (error) {

                console.log('error', error)
                ctx.throw(401, 'err')
            }
        });
        const encodedCustomer = jwt.sign(
            {
                customerID: customerreg.customerID,
                ...ctx.body
            },
            process.env.JWT_KEY
        );
        ctx.body = ({
            data: encodedCustomer,
            error: false,
            msg: ''
        });
    } catch (err) {
        ctx.throw = ({
            data: null,
            error: true,
            msg: 'Error, please try again'
        });
        console.log('err', err)

    }
})

// Something is wrong with the compare still need to work on
router.post('/login', async ctx => {
    try {
        const [[customerreg]] = await ctx.state.db.query(`
            SELECT * FROM customerreg WHERE email = :email
        `, {
            email: ctx.request.body.email
        });

        if (!customerreg) {
            ctx.throw({
                data: null,
                error: true,
                msg: 'Email not Found'
            });
        }

        console.log(customerreg);

        const customerPassword = ` ${customerreg.passWord}`;

        console.log('customerPassword', customerPassword);

        const compare = await bcrypt.compare(ctx.request.body.passWord, customerPassword);

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


            ctx.throw({
                data: encodedCustomer,
                error: false,
                msg: ''
            })
        } else {
            ctx.throw({
                data: null,
                error: true,
                msg: 'Password not found'
            });
        }

    } catch (err) {
        ctx.throw({
            data: null,
            error: true,
            msg: 'Error Logging In'
        });
        console.log('Error in /login', err)
    }
})

//Just filling in the jwt for now then moving on to the other end points
router.use(async function verifyJwt(ctx, next) {

    if (!ctx.headers.authorization) {
        ctx.throw(401, 'Invalid Authorization')
    }

    const [scheme, token] = ctx.headers.authorization.split(' ');

    console.log('[scheme, token]', scheme, ' ', token);

    if (scheme !== 'Bearer') {
        ctx.throw(401, 'Invalid Invalid authorization')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);

        console.log('payload1', payload)

        ctx.request.body.customerreg = payload;
    } catch (err) {
        if (err.message && (err.message.toUpperCase() === 'INVALID TOKEN' || err.message.toUpperCase() === 'JWT EXPIRED')) {
            ctx.status = err.status || 500;
            ctx.request.body = err.message;
            ctx.app.emit('jwt-error', err, ctx.request)
        } else {
            throw ((err.status || 500), err.message)
        }
        console.log(err)
    }

    await next();
})

router.get('/cart', async ctx => {
    try {
        const [cart] = await ctx.state.db.query(
            `SELECT * FROM customercartorders WHERE email=: email`, {
            email: ctx.request.body.email
        })
        ctx.body = { cart };
    } catch (err) {
        ctx.throw({
            data: null,
            error: true,
            msg: 'Error Cart'
        });
        console.log('Error in /cart', err)
    }
});

router.get('/cart/shippingChoice', async ctx => {
    try {
        const [shippingChoice] = await ctx.state.db.query(
            `SELECT * FROM orders where email =:email`, {
            email: ctx.request.body.email
        });

        ctx.body = { shippingChoice };
    } catch (err) {
        ctx.throw({
            data: null,
            error: true,
            msg: 'Error Cart Shipping'
        });
    }
})

router.get('/cart/itemTotal', async ctx => {
    try {
        const [itemsTotal] = await ctx.state.db.query(
            `SELECT SUM(productPrice) as itemsTotal FROM customercartorders WHERE email  =:email `, {
            email: ctx.request.body.email
        })
        ctx.body = { itemsTotal };
    } catch (err) {
        ctx.throw({
            data: null,
            error: true,
            msg: 'Error in Cart itemTotal'
        })
        console.log('Error Getting Item Total', err);
    }
})

///Need to convert Just a copy paste
router.get('/check-out-page/customerInfo', async (req, res) => {
    try {
        const [customerInfo] = await req.db.query(
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
            {
                email: req.customerreg.email
            })
        res.json(customerInfo);
    } catch (err) {
        console.log('Getting Error CustomerInfo', err);
    }
})


//Items are inserted into the "cart" from each product page not the "cart" 
router.post('/products/:productCode', async (req, res) => {
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
router.delete('/cart/:productCode', async (req, res) => {
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


router.delete('/shipping', async (req, res) => {
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
router.post('/shipping', async (req, res) => {
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



app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));