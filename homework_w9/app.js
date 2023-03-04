const express = require('express');
const app = express();
const router = require('./routes/index.js');
const errorHandler = require('./middlewares/errorhandler.js');
const swaggerUi = require('swagger-ui-express');
const moviesUsersJson = require('./movies-users.json');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(moviesUsersJson));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/', errorHandler);

app.listen(3000);
