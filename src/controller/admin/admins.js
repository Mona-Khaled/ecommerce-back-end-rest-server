const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// add other admins
exports.createAdmin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already created!",
      });
    const { firstName, lastName, email, password, role } = req.body;
    const hash_password = await bcrypt.hash(password, 10); //Password Hashing
    const _admin = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: Math.random().toString(),
      role,
    });

    _admin.save((error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin added successfully..!",
        });
      }
    });
  });
};

// display user accounts 
exports.getUsers = async (req, res) => {
    const users = await User.find({ role: 'user'})
      .select("_id firstName lastName email password role")
      .exec();
  
    res.status(200).json({ users });
  };
  