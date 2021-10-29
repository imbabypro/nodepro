const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bookStore")
    
.then(() => {
        console.log("success connect to database")
}).catch((err) => {
    console.log(err)
})
exports.mongoose;