var Dungbeetles = require('../controllers/dungbeetles.js');

module.exports = function (app) {
    
    app.get('/', function (req, res) {
        Dungbeetles.index(req, res);
    });

    app.post('/dungbeetles', function (req, res) {
        Dungbeetles.createNewDungbeetle(req, res);
    })

    app.get('/dungbeetles/new', function (req, res) {
        Dungbeetles.newDungbeetle(req, res);
    });

    app.get('/dungbeetles/:id', function (req, res) {
        Dungbeetles.specificDungbeetle(req, res);
    });

    app.get('/dungbeetles/edit/:id', function (req, res) {
        Dungbeetles.editDungbeetle(req, res);
    });

    app.post('/dungbeetles/:id', function (req, res) {
        Dungbeetles.submitEditDungbeetle(req, res);
    });

    app.get('/dungbeetles/roll/:id', function (req, res) {
        Dungbeetles.roll(req, res);
    });

    app.get('/dungbeetles/destroy/:id', function (req, res) {
        Dungbeetles.deleteDungbeetle(req, res);
    });
}