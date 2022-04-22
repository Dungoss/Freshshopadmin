var mongoose = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

let accountSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: {
        type: String,
        default: "ACTIVE"
    },
    // avatar: {
    //     type: String,
    //     default: process.env.NODE_ENV !== "production" ? `${process.env.HOST_DOMAIN_DEV}/public/images/logo.png` : `${process.env.DOMAIN}/public/images/logo.png`
    // },
    role: {
      type: String,
      default: "USER",
    },
    createdAt: {
      type: Number,
      default: Date.now()
    },
    updatedAt: {
      type: Number,
      default: Date.now()
    }
});

accountSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// accountSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

let AccountModel = mongoose.model("account", accountSchema);
module.exports = AccountModel;
