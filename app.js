const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// mongoose.connect('mongodb+srv://george:<password>@node-shop.d4jxz.mongodb.net/<dbname>?retryWrites=true&w=majority')

mongoose.connect(
    'mongodb+srv://george:' + process.env.MONGO_ATLAS_PW + 
    '@node-shop.d4jxz.mongodb.net/node-shop?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH', 'DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
