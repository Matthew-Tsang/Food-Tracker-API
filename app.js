const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

var jwt = require("jsonwebtoken");
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:3000', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

require('./server/routes')(app);
app.get('*', (req, res) =>
    res.status(200).send({
        message: "test test"
}));


module.exports = app;


