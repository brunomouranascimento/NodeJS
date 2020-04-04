const { Router } = require('express');
const routes = Router();

const productsController = require('./controllers/productsController');
const shopController = require('./controllers/shopController');
const errorController = require('./controllers/errorController');
const authController = require('./controllers/authController');
const isAuth = require('./middleware/authMiddleware.js');

routes.get('/login', authController.getLogin);
routes.get('/signup', authController.getSignup);
routes.post('/login', authController.postLogin);
routes.post('/signup', authController.postSignup);
routes.post('/logout', authController.postLogout);
routes.get('/reset', authController.getReset);
routes.post('/reset', authController.postReset);
routes.get('/reset/:token', authController.getNewPassword);
routes.post('/new-password', authController.postNewPassword);

routes.get('/admin/add-product', isAuth, productsController.getAddProduct);
routes.post('/admin/add-product', isAuth, productsController.postAddProduct);
routes.get('/admin/products', productsController.getProducts);
routes.get(
  '/admin/edit-product/:productId',
  isAuth,
  productsController.getEditProduct
);
routes.post('/admin/edit-product', isAuth, productsController.postEditProduct);
routes.post(
  '/admin/delete-product',
  isAuth,
  productsController.postDeleteProduct
);

routes.get('/', isAuth, shopController.getIndex);
routes.get('/products', isAuth, shopController.getProducts);
routes.get('/products/:productId', isAuth, shopController.getProduct);
routes.get('/cart', isAuth, shopController.getCart);
routes.post('/cart', isAuth, shopController.postCart);
routes.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
routes.get('/orders', isAuth, shopController.getOrders);
routes.post('/create-order', isAuth, shopController.postOrder);

routes.use(errorController.get404);

module.exports = routes;
