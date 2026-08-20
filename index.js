require("dotenv").config();
const express=require("express")
const connectMongoDB=require("./connection")
const urlRouter=require("./routes/url")
const {
    logRequest
} = require("./middlewares");


const app = express();

const PORT = process.env.PORT;
connectMongoDB(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(logRequest);


app.use("/url", urlRouter);

app.listen(PORT,()=>{
    console.log(`Server Started at PORT ${PORT}`);
})