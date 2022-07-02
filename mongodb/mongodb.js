const express = require('express'); 
const mongoose = require('mongoose');
const dbConfig = require('../config/db-config.json');

const url = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@archive.esqyg.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`;

module.exports = () => {
    mongoose.connect(url).then(() => {
        console.log("MongoDB Connect")
    }).catch((err) => {
        console.log(err)
    });
}