const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/', (req, res, next) => {
    
    res.status(200).json({
        message: 'Handling get requests to /products'
    });
});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body,price
    });

    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        createdProduct: product,
        message: 'Handling post requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.param.productId;
    if (id === 'hamster') {
        res.status(200).json({
            message: 'Yes hamsters are the best',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }

});



router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated product'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted product'
    });
});

module.exports = router;
