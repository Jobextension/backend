require('dotenv').config()
const express = require('express');
const cors = require("cors");
const req = require("express/lib/request");

const app = express()
const port = 3000

app.use(
  cors({
    origin: process.env.CHROME_EXTENSION_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization, User-ID",
    credentials: true,
  })
);

app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.use('/api/user',require('./routes/userResumeRoutes'));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})