require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const User = require('./models/User');

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'bem vindo a nossa API!' });
});
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');

app.use(userRouter);
app.use(productRouter);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wxxottw.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3000);
    console.log('conectou ao banco!');
  })
  .catch((err) => console.log(err));
