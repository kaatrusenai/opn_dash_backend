const mongoose = require("mongoose");
var crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 35,
            trim: true
        },
        email:{
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        encry_password: {
            type: String,
            required: true
        },
        salt: String,
    },
    {timestamps: true}
)

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securedPassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    autheticate: function(plainpassword) {
        return this.securedPassword(plainpassword) === this.encry_password;
      },
    
      securedPassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
          return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (err) {
          return "";
        }
    }
}

module.exports = mongoose.model("dashusercred", userSchema) 