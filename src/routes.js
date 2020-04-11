const express = require('express');
const { Router } = require('express');
const routes = Router();

const { check, body } = require('express-validator');

const productsController = require('./controllers/productsController');
const shopController = require('./controllers/shopController');
const errorController = require('./controllers/errorController');
const authController = require('./controllers/authController');
const isAuth = require('./middleware/authMiddleware.js');

routes.get('/login', authController.getLogin);
routes.get('/signup', authController.getSignup);
routes.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);
routes.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);
routes.post('/logout', authController.postLogout);
routes.get('/reset', authController.getReset);
routes.post('/reset', authController.postReset);
routes.get('/reset/:token', authController.getNewPassword);
routes.post('/new-password', authController.postNewPassword);

routes.get('/admin/add-product', isAuth, productsController.getAddProduct);
routes.get('/admin/products', isAuth, productsController.getProducts);
routes.post(
  '/admin/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ],
  isAuth,
  productsController.postAddProduct
);
routes.get(
  '/admin/edit-product/:productId',
  isAuth,
  productsController.getEditProduct
);
routes.post(
  '/edit-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ],
  isAuth,
  productsController.postEditProduct
);
routes.delete(
  '/admin/product/:productId',
  isAuth,
  productsController.deleteProduct
);

routes.get('/', shopController.getIndex);
routes.get('/products', shopController.getProducts);
routes.get('/products/:productId', shopController.getProduct);
routes.get('/cart', isAuth, shopController.getCart);
routes.post('/cart', isAuth, shopController.postCart);
routes.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
routes.get('/checkout', isAuth, shopController.getCheckout);
routes.get('/checkout/success', shopController.getCheckoutSuccess);
routes.get('/checkout/cancel', shopController.getCheckout);
routes.get('/orders', isAuth, shopController.getOrders);
routes.get('/orders/:orderId', isAuth, shopController.getInvoice);

routes.use(errorController.get404);

module.exports = routes;
