const express = require("express");
const cors = require("cors");
const app = express();

const Publish = require("./src/controllers/publish");
const publish = new Publish();

const User = require("./src/controllers/users");
const user = new User()

const ensureAuthenticated = require("./src/middlewares/ensureAuthenticated");

app.use(cors());
app.use(express.json());

const PORT = 3333;

app.use('/', function (req, res, next) {
    res.status(200);
    next()
});

app.get("/", (req, res) => { res.send("hello world").status(200)});

app.post("/publish",(req, res) => {ensureAuthenticated, publish.createPublish(req, res)});
app.get("/publish",(req, res) => { publish.previewPublish(req, res)});

app.post("/register", (req, res) => {user.createUser(req, res)});
app.post("/login", (req, res) => {user.dataUsers(req, res)});
app.listen(PORT);