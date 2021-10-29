const express = require('express');
const router = express.Router();

const books = require('../controller/book');

// router.get('/', books.listAllBooks)
// router.get('/', books.listOneBook)
router.get('/', books.paginate)
router.post('/', books.create)
router.put('/:id', books.update)
router.delete('/:id', books.delete)

module.exports = router