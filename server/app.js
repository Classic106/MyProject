const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const cors = require('cors');

const Cars = require('./modules/cars/routes');
const Users = require('./modules/users/routes');
const SearchItems = require('./modules/searchCars/routes');

mongoose.connect(process.env.DB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, 
    function(err){
        if(err) return console.log(err);
});

const app = express();

app.use(fileUpload());
app.use(express.json());

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));

app.use('/', express.static(path.resolve(__dirname, 'public')),
    (req, res, next)=>{
        next();
    }
);

app.use('/cars', Cars);
app.use('/users', Users);
app.use('/searchItems', SearchItems);

module.exports = app;
