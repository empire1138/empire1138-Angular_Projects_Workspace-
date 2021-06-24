

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
   body = ctx.response;

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
                    customerLastName: ctx.response.body.customerLastName,
                    customerFirstName: ctx.response.body.customerFirstName,
                    phone: ctx.response.body.phone,
                    addressLine1: ctx.response.body.addressLine1,
                    addressLine2: ctx.response.body.addressLine2,
                    city: ctx.response.body.city,
                    state: ctx.response.body.state,
                    postalCode: ctx.response.body.postalCode,
                    userName: ctx.response.body.userName,
                    email: ctx.response.body.email,
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
        ctx.body=({
            data: encodedCustomer,
            error: false,
            msg: ''
        });
    } catch (err) {
        ctx.throw=({
            data: null,
            error: true,
            msg: 'Error, please try again'
        });
        console.log('err', err)
        ctx.throw(err)
    }
}) 
    






app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));