const express = require('express');
const bodyParser = require('body-parser');

const PORT = 4000;
const api = require('./routes/api');
const cors = require('cors');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', api);

app.options('*', cors());

app.get("/", function(req, res) {
    console.log("get services");
});

app.listen(PORT, function(){
    console.log("App listen port :" + PORT);
});

//mongodb://lintellect:lintellect1@ds135305.mlab.com:35305/crudlogin
//lintellect
//lintellect1