const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/newusers", require("./routes/newUserRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/candidate", require("./routes/candidateRoutes"));
app.use(errorHandler);


app.listen(process.env.PORT, (req,res) =>{
    console.log(`New Server is running on port ${process.env.PORT}`);
})