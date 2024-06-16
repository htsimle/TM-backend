const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/config');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
