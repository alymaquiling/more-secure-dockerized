const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs')

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
const User = db.user;

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

  User.create({
    username: "admin",
    email: "administrator",
    password: bcrypt.hashSync("administrator", 8),
    roles: [db.ROLES[0], db.ROLES[1], db.ROLES[2]]
  }).then(user => {
    user.setRoles([1, 2, 3])
  })
  
  User.create({
    username: "mod",
    email: "mod@example.com",
    password: bcrypt.hashSync("moderator", 8),
    roles: [db.ROLES[0], db.ROLES[1], db.ROLES[2]]
  }).then(user => {
    user.setRoles([1, 2])
  })

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
