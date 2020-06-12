const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const database = require('../database/index');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth', routes.auth);
app.use('/userTransaction', routes.transaction);
app.use('/driverTransaction', routes.driver);
app.use('/user', routes.user)
app.use('/driver', routes.driver)

const port = process.env.PORT || 8080;

database.sql.sync({force: true});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});