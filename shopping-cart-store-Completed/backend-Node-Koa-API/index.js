

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
const logger = require('koa-logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const json = require('koa-json')
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
        throw error
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


router.get('/shipping' , async ctx =>{ 
    try {
        const [shippingOptions] = await ctx.state.db.query(
            `SELECT * FROM shippingcost `
        ); 
            ctx.body = {shippingOptions}
    } catch (err){ 
        console.log('Error in the shipping Get', err)
    }
})


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));