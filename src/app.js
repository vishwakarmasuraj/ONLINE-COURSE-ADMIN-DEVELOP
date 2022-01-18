require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import passport from "passport";

/**
 * 
 */
( async () => {
    const app = express();
    const routePath = require('./router');
    const server = http.createServer(app);
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(passport.initialize());
    app.use('/api', routePath);
    const port = process.env.PORT || 8000
    try {
        await mongoose.connect(process.env.DB_URL, {});
        server.listen(port)
        .on('listening', () => console.log(`App is starting on port: ${port}`))
        .on('error', (err) => (
            console.log(`An error occuring while starting server!`, err)
        ));
    } catch (error) {
        console.log(`An error happening while DB trying to connect!`, error);
        return 
    };
})();