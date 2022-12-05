const mongoose = require('mongoose');

require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, PORT, FRONT, YOUR_API_KEY, DB_URI
} = process.env;

const dbConnect = () => {    
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('**** CONEXION CORRECTA ****')
        } else {
            console.log('***** ERROR DE CONEXION ****')
        }
    })
};


module.exports = dbConnect;