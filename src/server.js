const express = require('express');
const routes = require('./routes');

const bodyParser = require('body-parser');

const app = express();

app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000);
