/**
 *   Customer Authentication
 *
 **/

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12d",
  });
};
/********************************* Signup ****************************************/
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered!",
      });
    // else create new user
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10); // Password Hashing
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

/********************************** Signin ***************************************/

/*  as long as login is successful, TOKEN (JWT) should be returned to manage user session,
    so when logged in a token will be sent with every request to verify from the backend.
    Token creation takes 3 args:
    Arg 1 ==>  payload
    Arg 2 ==>  private key
    Arg 3 ==>  expiresIn
*/
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      // if user email exists, verify password
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET_KEY,
        //   { expiresIn: "12d" }
        // );
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
