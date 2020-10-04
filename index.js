const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

/** Mongodb Database Connection*/
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8cle8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = process.env.PORT || 5000;

/** Middlewars */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//** Database and Server starting */
client.connect((err) => {
  if (err) {
    console.log("Database Error", err);
    return;
  }
  console.log("Database connected");

  const eventsCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("events");

  require("./routes/eventRoutes")(app, eventsCollection);
});

app.get("/", (req, res) => {
  res.send("Node.js is running");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
