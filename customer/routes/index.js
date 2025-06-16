var express = require('express');
var db = require("../models"); 
var CustomerService = require("../services/CustomerService"); 
var router = express.Router();

var customerService = new CustomerService(db); 

/* GET home page */
router.get('/', function (req, res) {
    res.render('customers', { title: 'Customer Service', customers: [], error: null });
});

/* GET customers by last name prefix */
router.get('/:prefix', async function (req, res) {
    const prefix = req.params.prefix;

    try {
        let customers = await customerService.getCustomersByPrefix(prefix);

        if (customers.length === 0) {
            return res.status(404).render('customers', { title: 'Customer Search', customers: [], error: "No customers found" });
        }

        res.render('customers', { title: 'Customer Search Results', customers, error: null });

    } catch (error) {
        console.error("Error:", error);
        res.status(404).render('customers', { title: 'Customer Service', customers: [], error: "Server error" });
    }
});

module.exports = router;