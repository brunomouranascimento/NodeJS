const path = require('path');
const express = require('express');

const sequelize = require('./utils/database');
const mongoose = require('mongoose');

const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cartItemModel');
const Order = require('./models/orderModel');
const OrderItem = require('./models/orderItemModel');

const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use(routes);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

mongoose.connect(
  'mongodb+srv://brunonascimento:psp2mb@cluster0-yv9b6.gcp.mongodb.net/nodejs?retryWrites=true&w=majority'
);

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user)
//       return User.create({ name: 'Bruno', email: 'bruno.bmn@gmail.com' });
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     user.createCart();
//   })
//   .then(cart => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
