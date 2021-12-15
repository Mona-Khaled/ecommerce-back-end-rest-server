const express = require("express");
const { signup, signin } = require("../controller/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *  get:
 *   description: this is signup
 *   responses:
 *     '200':
 *       description: A successful response
 */
router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// router.post('/signout', signout);

module.exports = router;
