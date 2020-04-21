const express = require('express');
const app = express();
var router = express.Router()
const mongoose = require('mongoose');
const port = process.env.port || 3000;
const cors = require('cors');
const todosController = require("./controllers/todosController");
const apiController = require("./controllers/apiController");
app.use(cors());
app.use(express.json());
require('dotenv').config();
const uri = process.env.MONGOATLASCLIENT;


app.listen(port,()=>{
  console.log(`The server is listening on the port ${port}`);
});

// GET method route
todosController(app);
apiController(app);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open',() => {
  console.log("The Mongodb connection established successfully");
})

console.log(connection);
