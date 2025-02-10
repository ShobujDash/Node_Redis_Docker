import express from "express"
import dotenv from 'dotenv'
import connectDB from "./db/database.js";
import userRoute from "./route/user.js"
import todoRoute from "./route/todo.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";



const app = express();
dotenv.config();
connectDB()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user",userRoute)
app.use("/api/v1/todo", todoRoute);



const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});


