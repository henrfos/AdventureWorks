var express = require('express');
var db = require("../models"); 
var ProductService = require("../services/ProductService");
var router = express.Router();
var productService = new ProductService(db); 

/* GET home page */
router.get('/', async function (req, res) {
    const searchId = req.query.searchId;
    
    if (!searchId) {
        return res.render('product', { title: 'Express', product: null, error: null });
    }

    try {
        const product = await productService.getProductById(searchId);

        if (!product) {
            return res.status(404).render('product', { title: 'Express', product: null, error: "Product not found" });
        }

        res.render('product', { title: 'Product Details', product, error: null });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).render('product', { title: 'Express', product: null, error: "Server error" });
    }
});

/* GET product by ID */
router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).render('product', { title: 'Express', product: null, error: "Product not found" });
        }

        res.render('product', { title: 'Product Details', product, error: null });

    } catch (error) {
        console.error("Error:", error);
        res.status(404).render('product', { title: 'Express', product: null, error: "Product not found" });
    }
});

module.exports = router;

