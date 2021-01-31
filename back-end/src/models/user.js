// Native modules import
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// Constants declaration
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  pseudo: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String,
  },
  about: {
    type: String,
    trim: true,
  },
  resetPasswordLink: {
    data: String,
    default: "",
  }
});

// Creating a virtual field to hash the password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });
  
  // Adding methods to our schema:
userSchema.methods = {
  authenticateUser: function (text) {
    return this.encryptPassword(text) === this.hashed_password;
  },
  
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  }
}


export default mongoose.model("User", userSchema);
