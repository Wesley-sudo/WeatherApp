const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
        displayName: { type: String },
        name: {
            familyName: { type: String },
            givenName: { type: String } 
        },
        photo: { type: String },
        location: { type: String }
    },
    google: {
        id: { type: String },
        token: { type: String }
    },
    github: {
        id: { type: String },
        token: { type: String }
    }
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;