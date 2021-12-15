const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();
const {requireSignin, adminMiddleware} = require('../../common-middleware');


router.post('/initialdata', requireSignin, adminMiddleware, initialData);


module.exports = router;  