const { Router } = require('express');
const routes = Router();

const productsController = require('./controllers/productsController');
const errorController = require('./controllers/errorController');

routes.get('/admin/add-product', productsController.getAddProduct);
routes.post('/admin/add-product', productsController.postAddProduct);
routes.get('/', productsController.getProducts);

routes.use(errorController.get404);

module.exports = routes;
