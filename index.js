const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db')
const app = express();
const employeeRouter = require('./routes/employeeRoutes');
const assetRouter = require('./routes/assetRoutes');
const userRouter = require('./routes/userRoutes');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/emp', employeeRouter);
app.use('/asset', assetRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Tms API' });
});

sequelize.sync({force:false})
.then(() => {
  console.log('Database synchronized');
  // Start the server
  app.listen(port, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error('Unable to synchronize the database:', error);
});