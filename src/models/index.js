const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = require('./User')(sequelize, DataTypes);
const Organisation = require('./Organisation')(sequelize, DataTypes);

User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });

module.exports = { sequelize, User, Organisation };






// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   logging: console.log, // Enable logging
// });

// const User = require('./User')(sequelize, DataTypes);
// const Organisation = require('./Organisation')(sequelize, DataTypes);

// User.belongsToMany(Organisation, { through: 'UserOrganisations' });
// Organisation.belongsToMany(User, { through: 'UserOrganisations' });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// sequelize
//   .sync({ force: true }) // Using force: true for testing purposes, it drops and recreates the tables
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch((err) => {
//     console.error('Error creating database & tables:', err);
//   });

// module.exports = { sequelize, User, Organisation };
