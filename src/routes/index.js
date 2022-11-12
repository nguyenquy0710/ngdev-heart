"use strict";
const fs = require('fs');
const moment = require('moment');
const path = require("path");

/**
 * Routes Definitions
 */
const Express = require('express');

const router = Express.Router();

router.get('/', (req, res, next) => {
    return res
        .status(200)
        .render('index', {
            title: "Nguyen Quy Blog",
        });
});

module.exports = router;