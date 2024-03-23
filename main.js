require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();

const Publish = require("./src/controllers/publish");
const publish = new Publish();

const User = require("./src/controllers/users");
const user = new User()

const AppError = require("./src/utils/appError");

const ensureAuthenticated = require("./src/middlewares/ensureAuthenticated");

app.use(cors());
app.use(express.json());

const PORT = 3333;
app.use((err, req, res, next) => {
    
    if (err instanceof AppError) {
        return res.status(err.statuscode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    });
});


app.get("/", (req, res) => { res.send("hello world").status(200)});

app.post("/publish", ensureAuthenticated, (req, res) => { publish.createPublish(req, res)});
app.get("/publish",(req, res) => { publish.previewPublish(req, res)});

app.post("/register", (req, res) => {user.createUser(req, res)});
app.post("/login", (req, res) => {user.dataUsers(req, res)});
app.listen(PORT);