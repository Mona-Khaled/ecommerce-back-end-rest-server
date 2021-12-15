// Importing modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); /****bcrypt is Password Hashing module****/

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // remove whitespaces if exist
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      // specify user or admin
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

/******************************** Mongoose Virtuals ***************************************/
// Password Hashing  ---> bcrypt is sync approach
// userSchema.virtual('password').set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10); // 10 for password salting
// });

// Create a virtual property `fullName` that's computed from `firstName` and `lastName`.
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// user authentication---> returns T or F
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema); // user ===> Admin or Customer
