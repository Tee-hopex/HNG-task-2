const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/organisations', require('./routes/orgRoutes'));

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;