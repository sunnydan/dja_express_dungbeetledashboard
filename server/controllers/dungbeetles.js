var mongoose = require('mongoose');
var DungBeetle = mongoose.model('DungBeetle');
const session = require("express-session");
const moment = require('moment');

module.exports = {

    index: function(req, res) {
        DungBeetle.find({}, function (err, dungbeetles) {
            if (err) {
                console.log(err);
            }
            context = {};
            context['dungbeetles'] = dungbeetles;
            context['moment'] = moment;
            res.render('index', context);
        });
    },

    createNewDungbeetle: function(req, res) {
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
    },

    newDungbeetle: function(req, res) {
        context = {};
        if (req.session.errors) {
            context['errors'] = req.session.errors;
            req.session.errors = undefined;
        }
        res.render('new');
    },

    specificDungbeetle: function(req, res) {
        DungBeetle.findOne({ _id: req.params.id }, function (err, dungbeetle) {
            if (err) {
                console.log(err);
            }
            context = {};
            context['dungbeetle'] = dungbeetle;
            context['moment'] = moment;
            res.render('dungbeetle', context);
        });
    },

    editDungbeetle: function(req, res) {
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
    },

    submitEditDungbeetle: function(req, res) {
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
    },

    roll: function(req, res) {
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
    },

    deleteDungbeetle: function(req, res) {
        DungBeetle.remove({ _id: req.params.id }, function (err) {
            console.log(err);
        });
        res.redirect('/');
    }
}