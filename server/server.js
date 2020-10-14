const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:1234'
}));

app.use(cors({
  exposedHeaders: ['x-access-token', 'Origin', 'Content-Type', 'Accept'],
}));

const db = require('./app/models');
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  });

  Role.create({
    id: 2,
    name: 'moderator'
  });

  Role.create({
    id: 3,
    name: 'admin'
  });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/ping.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
