"use strict";

/**
 * Required External Modules
 */
const cors = require('cors');
const path = require('path');
const i18n = require('i18n');
const helmet = require('helmet');
const moment = require('moment');
const morgan = require('morgan');
const express = require('express');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const rfs = require('rotating-file-stream'); // version 2.x
const dotenv = require('dotenv').config({
    encoding: 'utf8',
});

/**
 * App Variables
 */
const app = express();

i18n.configure({
    // define how many languages we would support in our application
    locales: ['vi'], //['en', 'vi'],
    // define the path to language json files, default is /locales
    directory: "" + __dirname + "/locales",
    fallbacks: { 'en': 'vi' },
    // define the default language
    defaultLocale: 'vi',
    // define a custom cookie name to parse locale settings from 
    cookie: 'locale',
    queryParameter: 'lang',
    directoryPermissions: '755',
    autoReload: true,
    updateFiles: true,
    syncFiles: true,
    objectNotation: true,
    api: {
        '__': '__',  //now req.__ becomes req.__
        '__n': '__n' //and req.__n can be called as req.__n
    }
});

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'html');

// compress response
app.use(compression({
    chunkSize: 16384,
    // filter decides if the response should be compressed or not,
    // based on the `shouldCompress` function above
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        } else if (req.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return false
        }

        // fallback to standard filter function
        return compression.filter(req, res)
    },
    // The level of zlib compression to apply to responses. A higher level will result in better compression, but will take longer to complete.A lower level will result in less compression, but will be much faster.
    level: 6,
    // threshold is the byte threshold for the response body size
    // before compression is considered, the default is 1kb
    threshold: '100kb',
}));

/**
 *  App Configuration
 */
// app.use(morgan('combined', { stream: accessLogStream }))
// parse application/json
app.use(bodyParser.json({ limit: 1024 * 1024 * 20, }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// you'll need cookies
app.use(cookieParser());
// app.use(session({
//     name: `${APP.SESSION.NAME}`,
//     secret: `${APP.SESSION.SECRET}`,
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60000,
//     },
// }));
// init i18n module for this loop
app.use(i18n.init);
app.use(cors({
    origin: `http://localhost:${process.env['PORT']}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

/**
 * Set security HTTP headers
 */
// https://github.com/helmetjs/helmet
app.use(helmet({
    frameguard: {
        action: "sameorigin",
    },
}));

/**
 * static files
 */
app.use('/assets', express.static(path.join(__dirname, "assets"), {
    etag: true,
    maxAge: '86400000', // uses milliseconds per docs
}));
app.use('/locales', express.static(path.join(__dirname, "locales"), {
    etag: true,
    maxAge: '86400000', // uses milliseconds per docs
}));


app.use('/', require('./routes/index'));

module.exports = app;