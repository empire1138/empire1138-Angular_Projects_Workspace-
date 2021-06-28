const express = require('express');
const logger = require("morgan");
require('dotenv').config();
const cors = require('cors');
const errorController = require('./controllers/error');
const registrationRoutes = require('./routes/registration');
const cartRoutes = require('./routes/cart');
const checkOutPageRoutes = require('./routes/check-out-page');
const loginRoutes = require('./routes/login');
const productsRoutes = require('./routes/products');
const shippingRoutes = require('./routes/shipping');
const startPageRoutes = require('./routes/startpage');
const app = express();


require('dotenv').config();
const port = process.env.PORT;


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Non-protected Routes
app.use('/', startPageRoutes);
// app.use('/products', productsRoutes); 
// app.use('/shipping', shippingRoutes); 
// app.use('/registration', registrationRoutes);
// app.use('/login', loginRoutes); 
app.use(errorController.get404);
app.use(errorController.get500);
//Protected Routes
// app.use('/cart', cartRoutes); 
// app.use('/check-out-page', checkOutPageRoutes); 
 


app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));
