const express = require('express');
const router = express.Router();

const users = require('../controller/user');


router.post('/signup', users.signUp)
router.post('/login', users.login)
router.get('/', users.listUsers)
router.delete('/:id', users.delete)
router.put('/:id', users.update)

module.exports = router