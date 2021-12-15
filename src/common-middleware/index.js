const jwt = require("jsonwebtoken");
const multer = require("multer"); //for file upload --> 'part of router config'
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

/*
--->  grab token from request 
      (Bearer token) --> from req.headers.authorization,
            to get token itself, use split by spaces,
            Bearer(index 0) and token(index 1).
--->  user returned from token consists of (_id) and (expiration time)
--->  attach user as new property with request, so it can be accessd 
      in the next function
*/
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
  } else {
    return res.status(500).json({ message: "Authorization required" });
  }
  next();
};
// ------------------------ Admin authorization ------------------------
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(500).json({ message: "Admin access denied" });
  }
  next();
};
// ------------------------- User authorization -------------------------
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(500).json({ message: "User access denied" });
  }
  next();
};
