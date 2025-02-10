const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/connectDB');
const router = require('./routers/index');
const cookieParser = require('cookie-parser');
const {app,server} = require('./socket/index')


// const app = express();
app.use(
  cors({
    origin: process.env.FRNTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Cookie Enable করার জন্য
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server runngin at port " + PORT,
    success:true
  })
})



// api endpints
app.use("/api", router);


connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});






































