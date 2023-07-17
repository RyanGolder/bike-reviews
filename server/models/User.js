const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: 'You need to provide a username!',
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: 'You need to provide an email address!',
        unique: true,
        match: [/.+@.+\..+/, 'You need to provide a valid email address!'],
    },
    password: {
        type: String,
        required: 'You need to provide a password!',
        minlength: 5,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
}
);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
