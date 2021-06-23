"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Koa = require('koa');
var app = new Koa();
var views = require('koa-views');
var json = require('koa-json');
var onerror = require('koa-onerror');
var bodyparser = require('koa-bodyparser');
var logger = require('koa-logger');
var cors = require('koa-cors');
var mysql = require('mysql2/promise');
require('dotenv').config();
var Router = require('koa-router');
var router = new Router();
app.use(logger());
var port = process.env.PORT;
var config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USer,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
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
app.use(function mysqlConnection(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    _a = ctx.state;
                    _b = global;
                    return [4 /*yield*/, global.connectionPool.getConnection()];
                case 1:
                    _a.db = _b.db = _c.sent();
                    ctx.state.db.connection.config.namedPlacedholders = true;
                    return [4 /*yield*/, ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"')];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, ctx.state.db.query("SET time_zone = '-8:00'")];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, next()];
                case 4:
                    _c.sent();
                    ctx.state.db.release();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _c.sent();
                    if (ctx.state.db)
                        ctx.state.db.release();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
});
router.get('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ctx.state.db.query("SELECT * FROM products ")];
            case 1:
                products = (_a.sent())[0];
                ctx.body = { products: products };
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('/products error', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, function () { return console.log("Demo app listening at http://localhost:" + port); });
