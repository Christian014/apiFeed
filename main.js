const express = require("express");
const cors = require("cors");
const app = express();

const Publish = require("./src/controllers/publish");
const publish = new Publish();

app.use(cors());
app.use(express.json());

const PORT = 3333;

app.use('/', function (req, res, next) {
    res.status(200);
    next()
});

app.get("/", (req, res) => { res.send("hello world").status(200)})
app.post("/publish",(req, res) => { publish.createPublish(req, res)})
app.get("/publish",(req, res) => { publish.previewPublish(req, res)})
app.listen(PORT)