const express = require('express');

const bodyParser = require('body-parser');

const mysql = require('mysql2');

const morgan = require('morgan');

const groceryRoutes = require('./routes/grocery');

const registerRoutes = require('./routes/register');

const errorController = require('./controllers/error');

const app = express();

require('dotenv').config();
const port = process.env.PORT;


app.use(morgan('short'));



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/register', registerRoutes); 

app.use('/groceries', groceryRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(port, () => console.log(`Demo app listening at http://localhost:${port}`));
