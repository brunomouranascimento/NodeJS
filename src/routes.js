const { Router } = require('express');
const routes = Router();

const productsController = require('./controllers/productsController');
const shopController = require('./controllers/shopController');
const errorController = require('./controllers/errorController');

routes.get('/admin/add-product', productsController.getAddProduct);
routes.post('/admin/add-product', productsController.postAddProduct);
routes.get('/admin/products', productsController.getProducts);

routes.get('/', shopController.getIndex);

routes.get('/products', shopController.getProducts);

routes.get('/cart', shopController.getCart);

routes.get('/orders', shopController.getOrders);

routes.get('/checkout', shopController.getCheckout);

routes.use(errorController.get404);

module.exports = routes;
