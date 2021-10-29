const express = require('express');
const app = express();//create our server
const port = 3000;
require("./database")

const userRouter=require("./routes/user");
const bookRouter=require("./routes/book");
app.use(express.json()); //read only json files

app.use("/users", userRouter)
app.use("/books", bookRouter)

app.listen(port, () => {
    console.log("listining to port 3000")
})