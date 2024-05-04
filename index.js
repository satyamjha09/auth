const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 7000;


app.use(express.json());
require("./config/database").connect();


const user = require("./routes/user");
app.use("/api/v1" , user);


//activation
app.listen(PORT , () => {
    console.log(`App is listening at ${PORT}`);
})