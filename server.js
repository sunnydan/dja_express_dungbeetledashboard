const express = require('express');
const app = express();

const session = require("express-session");
app.use(session({ secret: "yamakemykokorogodokidokidonchaknow" }));

const path = require("path");
app.use(express.static(path.resolve(__dirname, "static")));
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dungbeetledashboard');
mongoose.Promise = global.Promise;

const moment = require('moment');

const DungBeetleSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    hexcolor: { type: String, required: true, maxlength: 7 },
    birthday: { type: Date, default: moment() },
    updated_at: { type: Date, default: moment() },
    dungsphereradius: { type: Number, default: 1 },
});
mongoose.model('DungBeetle', DungBeetleSchema); // We are setting this Schema in our Models as 'User'
const DungBeetle = mongoose.model('DungBeetle') // We are retrieving this Schema from our Models, named 'User' 

app.get('/', function (req, res) {
    DungBeetle.find({}, function (err, dungbeetles) {
        if (err) {
            console.log(err);
        }
        context = {};
        context['dungbeetles'] = dungbeetles;
        context['moment'] = moment;
        res.render('index', context);
    });
});

app.post('/dungbeetles', function (req, res) {
    console.log("POST DATA", req.body);
    let dungbeetle = new DungBeetle(req.body);
    console.log(dungbeetle);
    dungbeetle.save(function (err) {
        if (err) {
            req.session.errors = dungbeetle.errors;
            res.redirect('/dungbeetles/new');
        }
        else {
            res.redirect('/dungbeetles/' + dungbeetle._id);
        }
    });
})

app.get('/dungbeetles/new', function (req, res) {
    context = {};
    if (req.session.errors) {
        context['errors'] = req.session.errors;
        req.session.errors = undefined;
    }
    res.render('new');
});

app.get('/dungbeetles/:id', function (req, res) {
    DungBeetle.findOne({ _id: req.params.id }, function (err, dungbeetle) {
        if (err) {
            console.log(err);
        }
        context = {};
        context['dungbeetle'] = dungbeetle;
        context['moment'] = moment;
        res.render('dungbeetle', context);
    });
});

app.get('/dungbeetles/edit/:id', function (req, res) {
    DungBeetle.findOne({ _id: req.params.id }, function (err, dungbeetle) {
        if (err) {
            console.log(err);
        }
        context = {};
        if (req.session.errors) {
            context['errors'] = req.session.errors;
            req.session.errors = undefined;
        }
        context['dungbeetle'] = dungbeetle;
        context['moment'] = moment;
        res.render('edit', context);
    });
});

app.post('/dungbeetles/:id', function (req, res) {
    DungBeetle.findOne({ _id: req.params.id }, function (err, dungbeetle) {
        if (err) {
            console.log(err);
        }
        dungbeetle.name = req.body['name'];
        dungbeetle.hexcolor = req.body['hexcolor'];
        dungbeetle.updated_at = moment();
        dungbeetle.save(function (err) {
            if (err) {
                req.session.errors = dungbeetle.errors;
                res.redirect('/dungbeetles/edit/' + req.params.id);
            }
            else {
                res.redirect('/dungbeetles/' + dungbeetle._id);
            }
        });
    });
});

app.get('/dungbeetles/roll/:id', function (req, res) {
    DungBeetle.findOne({ _id: req.params.id }, function (err, dungbeetle) {
        if (err) {
            console.log(err);
        }
        dungbeetle.dungsphereradius = dungbeetle.dungsphereradius * 2;
        dungbeetle.updated_at = moment();
        dungbeetle.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/dungbeetles/' + dungbeetle._id);
            }
        });
    });
});

app.get('/dungbeetles/destroy/:id', function (req, res) {
    DungBeetle.remove({ _id: req.params.id }, function (err) {
        console.log(err);
    });
    res.redirect('/');
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
