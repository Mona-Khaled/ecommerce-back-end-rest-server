const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
const { requireSignin } = require('../../common-middleware')
/**A route is a section of Express code that associates an HTTP verb ( GET , 
  POST , PUT , DELETE , etc.), a URL path/pattern, and a function that is called
   to handle that pattern */


router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', signout);




module.exports = router;  