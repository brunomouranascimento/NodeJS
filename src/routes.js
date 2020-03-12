const { Router } = require('express');
const routes = Router();

const productsController = require('./controllers/productsController');
const shopController = require('./controllers/shopController');
const errorController = require('./controllers/errorController');

// routes.get('/admin/add-product', productsController.getAddProduct);
// routes.post('/admin/add-product', productsController.postAddProduct);
// routes.get('/admin/products', productsController.getProducts);

// routes.get('/admin/edit-product/:productId', productsController.getEditProduct);

// routes.post('/admin/edit-product', productsController.postEditProduct);

// routes.post('/admin/delete-product', productsController.postDeleteProduct);

// routes.get('/', shopController.getIndex);

// routes.get('/products', shopController.getProducts);

// routes.get('/products/:productId', shopController.getProduct);

// routes.get('/cart', shopController.getCart);

// routes.post('/cart', shopController.postCart);

// routes.post('/cart-delete-item', shopController.postCartDeleteProduct);

// routes.get('/orders', shopController.getOrders);

// routes.post('/create-order', shopController.postOrder);

routes.use(errorController.get404);

module.exports = routes;
