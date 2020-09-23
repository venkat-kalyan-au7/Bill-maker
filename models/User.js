import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import moment from "moment"
import keys from "../config/keys"
import uniqueValidator from "mongoose-unique-validator"

const saltRounds= 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50,
        required:true
    },
    email:{
        type: String,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        minlength: 6,
        required:true
    },
    lastname:{
        type: String,
        maxlength:50
    },
    token:{
        type: String
    },
    tokenExp: {
        type: Number
    }
})
userSchema.plugin(uniqueValidator)
userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),keys.secretKey)
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, keys.secretKey, function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }