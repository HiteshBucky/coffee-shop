const express = require('express')
const router = express.Router();
const controllers = require('../controllers');

router.get('/', async (req, res) => {
	const data = req.context;

	const itemCtrl = controllers.item.instance();
	data.coffee = await itemCtrl.get({category : "coffee"})
	data.pastries = await itemCtrl.get({category : "pastries"})
	data.cookies = await itemCtrl.get({category : "Cookies"})

	res.render('home', data)
})


router.get('/blog', (req, res) => {
	
	res.render('blog', req.context)
})

router.post('/order', async (req, res) => {
	let orderData = req.body;
	
	const orderCtrl = controllers.order.instance();
	const order = await orderCtrl.post(orderData)
	res.json(order)
})


router.get('/items', async (req, res) => {
	const filters = req.query;

	const itemCtrl = controllers.item.instance();
	const data = await itemCtrl.get(filters);

	res.json(data);
})

module.exports = router;