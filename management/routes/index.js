var express = require('express');
var router = express.Router();
var db = require("../models"); // Import database connection
var ManagementService = require("../services/ManagementService"); // Import service
var managementService = new ManagementService(db); // Create a service instance

/* GET home page. */
router.get('/querya', async (req, res, next) => {
    try {
        let queryA = await managementService.getCategoriesWithoutParent();
        res.render('querya', { query: queryA });
    } catch (error) {
        console.error("Error fetching Query A data:", error);
        res.render('querya', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryb', async (req, res, next) => {
    try {
        let queryB = await managementService.getAveragePriceByCategory();
        res.render('queryb', { query: queryB });
    } catch (error) {
        console.error("Error fetching Query B data:", error);
        res.render('queryb', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryc', async (req, res, next) => {
    try {
        let queryC = await managementService.getAveragePriceByParentCategory();
        res.render('queryc', { query: queryC });
    } catch (error) {
        console.error("Error fetching Query C data:", error);
        res.render('queryc', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryd', async (req, res, next) => {
    try {
        let queryD = await managementService.getTotalCustomersWithOrders();
        res.render('queryd', { query: queryD[0] }); 
    } catch (error) {
        console.error("Error fetching Query D data:", error);
        res.render('queryd', { query: { Total: 0 }, error: "Failed to retrieve data" });
    }
});

router.get('/querye', async (req, res, next) => {
    try {
        let queryE = await managementService.getCustomersWithSpecificNames();
        res.render('querye', { query: queryE });
    } catch (error) {
        console.error("Error fetching Query E data:", error);
        res.render('querye', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryf', async (req, res, next) => {
    try {
        let queryF = await managementService.getCustomerDataForExport();
        res.render('queryf', { query: queryF });
    } catch (error) {
        console.error("Error fetching Query F data:", error);
        res.render('queryf', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryg', async (req, res, next) => {
    try {
        let queryG = await managementService.getProductDataForExport();
        res.render('queryg', { query: queryG });
    } catch (error) {
        console.error("Error fetching Query G data:", error);
        res.render('queryg', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/queryh', async (req, res, next) => {
    try {
        let queryH = await managementService.getSalesOrderData();
        res.render('queryh', { query: queryH });
    } catch (error) {
        console.error("Error fetching Query H data:", error);
        res.render('queryh', { query: [], error: "Failed to retrieve data" });
    }
});

router.get('/', async (req, res, next) => {
	let options = [
		{
			name: 'Query A',
			link: 'querya',
			description: 'Display the table results for Query A',
		},
		{
			name: 'Query B',
			link: 'queryb',
			description: 'Display the table results for Query B',
		},
		{
			name: 'Query C',
			link: 'queryc',
			description: 'Display the table results for Query C',
		},
		{
			name: 'Query D',
			link: 'queryd',
			description: 'Display the table results for Query D',
		},
		{
			name: 'Query E',
			link: 'querye',
			description: 'Display the table results for Query E',
		},
		{
			name: 'Query F',
			link: 'queryf',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query G',
			link: 'queryg',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query H',
			link: 'queryh',
			description: 'Query result for PowerBI visualization',
		},
	];

	res.render('index', { options: options });
});

module.exports = router;

