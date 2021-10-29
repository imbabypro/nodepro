const books = require('../models/book');
const jwt = require('jsonwebtoken')
//create book
exports.create = (req, res) => {
const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, bookData) => {
    if (bookData) {
        const book = new books({
            bookName: req.body.bookName,
            UserName: req.body.UserName,
            auther: req.body.auther,
            description: req.body.description,
            userid: bookData.id
        } )
        book.save()
            .then(bookData => {
                res.send(bookData)
            }).catch(err => {
                res.send(err)
            })
    } else {
        res.send("You cannot access books");
    }
})
}

//display book by its name
exports.listOneBook = (req, res)=> {
    books.findOne({ bookName: req.body.bookName },function (err, book) {
        if (err) res.status(400).send(err);
        res.status(200).send(book);
    });
}

//display all book
exports.listAllBooks = (req, res) => {
    books.find()
        .then(books => {
            res.send(books)
        }).catch(err => {
            res.send(err)
        })
    
}

//update book
exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, userData) => {
        if (userData.userType === "user" ) {
            books.findOneAndUpdate({ _id: req.params.id ,userid: userData.id}, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        } else if (userData.userType === "admin") {
            books.findByIdAndUpdate(req.params.id, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}
//update book
exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "ahims", (err, userData) => {
        if (userData.userType === "user" ) {
            books.findOneAndDelete({ _id: req.params.id ,userid: userData.id},(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        } else if (userData.userType === "admin") {
            books.findByIdAndDelete(req.params.id,(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}

//pagination
exports.paginate= (req, res)=>{
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    books.find({}).skip(skip).limit(limit)
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};
