const express = require('express');
const app = express();

const session = require("express-session");
app.use(session({ secret: "yamakemykokorogodokidokidonchaknow" }));

const path = require("path");
app.use(express.static(path.resolve(__dirname, "./client/static")));
app.set('views', path.resolve(__dirname, "./client/views"));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/mongoose.js');

const route_setter = require('./server/config/routes.js');
route_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
