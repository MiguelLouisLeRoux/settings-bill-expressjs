const express = require('express');
const PORT = process.env.PORT || 3011;
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
const settingsBill = SettingsBill();
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, function() {
   
});
 
app.get("/", function(req, res){
  res.render('index', {settings: settingsBill.getSettings()});
   
});

app.use(express.static('public')); 

app.post("/settings", function(req, res){
    
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    });
    console.log(settingsBill.getSettings());

    res.redirect('/');
});

app.post("/action", function(req, res){
    
});

app.get("/actions", function(req, res){
    
});

app.get("/actions/:type", function(req, res){
    
});

