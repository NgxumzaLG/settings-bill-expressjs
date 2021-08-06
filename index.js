const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const BillWithSettings = require('./settings-bill');
const moment = require('moment');

const app = express();
const settingsBill = BillWithSettings();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        colors: settingsBill.totalClassName()

    });
});

app.post('/settings', function(req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost, 
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    });

    // console.log(settingsBill.getSettings());
    res.redirect('/');

});

app.post('/action', function(req, res) {
    settingsBill.recordAction(req.body.actionType);

    res.redirect('/');

});

app.get('/actions', function(req, res) {
    res.render('actions', {
        actions: settingsBill.actions()
    });

     

});

app.get('/actions/:actionType', function(req, res) {
    const actionType = req.params.actionType;
    res.render('actions', {
        actions: settingsBill.actionsFor(actionType)
    });

});

  
let PORT = process.env.PORT || 3011;
  
app.listen(PORT, function(){
    console.log('App starting on port', PORT);
});
  