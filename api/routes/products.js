const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
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
