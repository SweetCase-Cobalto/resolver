// load env
require('dotenv').config();
// imports
const express = require('express');
const bodyParser = require('body-parser');

// apps

// express app
const app = express();
// ThirdParty
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Router 등록

// Run
const serverPort = parseInt(process.env.SERVER_PORT);
app.listen(serverPort, () => {
    // Load
    console.log('Start!');
});