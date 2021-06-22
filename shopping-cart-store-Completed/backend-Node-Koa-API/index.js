export interface Global {
    db: any;
    connectionPool: any;
    globalConfig: any;
    document: Document;
    window: Window;

}

declare var global: Global;


const Koa = require('koa');
const app = new Koa();
const mysql = require('koa-mysql');



require('dotenv').config();
const port = process.env.PORT;

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

global.connectionPool = mysql.createPool(config);

app.use(async function mysqlConnection(ctx, next) {
    try {
        ctx.state.db = global.db = await global.connectionPool.getConnection();
        ctx.state.db.connection.Config.namedPlaceholders = true;

        await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        await ctx.state.db.query(`SET time_zone = '-8:00'`);

        await next();

        ctx.state.db.release();
    }   catch(error){
            if (ctx.state.db) ctx.state.db.release();
            throw error
    }
})

app.get('/', async function (req, res) {
    try {

        const [products] = await req.db.query(
            `SELECT * FROM products `
        );

        res.json(products);


    } catch (err) {
        console.log('/products error', err)
    }
});

app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));