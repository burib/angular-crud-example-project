const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/DB');

const itemRoutes = require('./routes/item.route');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB).then(
      () => {
        console.log('Database is connected')

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use('/items', itemRoutes);

        const port = process.env.PORT || 4000;

        const server = app.listen(port, function(){
         console.log('Listening on port ' + port);
        })
      },
      err => { console.log('Can not connect to the database '+ err)}
    );
