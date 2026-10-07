require("dotenv").config();

const express = require("express");

const connectMongoDB = require("./connection");

const urlRouter = require("./routes/url");

const { logRequest } = require("./middlewares");

const app = express();

const PORT = process.env.PORT;


// MongoDB connection
connectMongoDB(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// Middleware
app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(logRequest);


// EJS
app.set("view engine", "ejs");

app.set("views", "./views");


// Home page
app.get("/", (req, res) => {
    res.render("home");
});


// URL routes
app.use("/url", urlRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});