const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/config');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();

const corsOptions = {
  origin: 'https://tm-frontend-mauve.vercel.app', // Adjust this to your frontend URL on Vercel
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port', process.env.PORT || 5000);
  });
});
