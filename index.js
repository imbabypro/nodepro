const express = require('express');
const app = express();//create our server
const port = 3000;
require("./database")

const userRouter=require("./routes/user");
const bookRouter=require("./routes/book");
app.use(express.json()); //read only json files
app.get('/',(req,res)=>{
    res.send('hello')
})

app.get("/",(req,res)=>{res.send("<h1>heloo</h1>")})
app.use("/users", userRouter)
app.use("/books", bookRouter)

app.listen(port, () => {
    console.log("listining to port 3000")
})
