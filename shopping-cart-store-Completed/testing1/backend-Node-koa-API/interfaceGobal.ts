export interface Global {
    db: any;
    connectionPool: any;
    globalConfig: any;
    document: Document;
    window: Window;
}

 declare let global: Global;

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USer,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}


const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');
const mysql = require('mysql2/promise');

require('dotenv').config();
const Router = require('koa-router')
const router = new Router();
app.use(logger());


global.connectionPool = mysql.createPool(config);

 // Configure cross domain
//  app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost:3060');
//     ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
//     ctx.set('Access-Control-Allow-Credentials', true);
//     ctx.set('Access-Control-Max-Age', 3600 * 24);
//     await next();
//   });

//   app.use(cors());

//   app.use(bodyParser.urlencoded({ extended: true }));
//   app.use(bodyParser.json());
  

app.use(async function mysqlConnection(ctx, next) {
    try {
        ctx.state.db = global.db = await global.connectionPool.getConnection();
        ctx.state.db.connection.config.namedPlacedholders = true;

        await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        await ctx.state.db.query(`SET time_zone = '-8:00'`)
        await next();

        ctx.state.db.release();
    } catch (error) {
        if (ctx.state.db) ctx.state.db.release();
        throw error
    }}
)


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