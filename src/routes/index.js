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

router.get('/heart01', (req, res, next) => {
    return res
        .status(200)
        .render('heart01', {
            title: "Nguyen Quy Blog",
        });
});

router.get('/zalo_verifierGjIaShB99sHZk85uWuKrJrxmu1YoXJ9ED3K.html', (req, res, next) => {
    return res
        .status(200)
        .render('zalo_verifierGjIaShB99sHZk85uWuKrJrxmu1YoXJ9ED3K', {
            title: "Nguyen Quy Blog",
        });
});

router.get('/zalo_verifierOV2m2f7LF1TmmkWDekC-4cYKbmQ4uaTQD3S.html', (req, res, next) => {
    return res
        .status(200)
        .render('zalo_verifierOV2m2f7LF1TmmkWDekC-4cYKbmQ4uaTQD3S', {
            title: "Nguyen Quy Blog",
        });
});

module.exports = router;