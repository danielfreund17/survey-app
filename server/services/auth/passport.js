const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
passport.use(new GoogleStrategy({
    clientSecret: keys.googleClientSecret,
    clientID: keys.googleClientID,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(done);
    const existingUser = await User.findOne({ googleId: profile.id });
    if (!existingUser) {
        try {
            const newUser = await new User({ googleId: profile.id }).save();
            done(null, newUser);
        }
        catch (err) {
            console.log(err);
        }

        return;
    }

    done(null, existingUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


