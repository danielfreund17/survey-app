require('./models/User');
require('./services/auth/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
mongoose.connect(keys.mongoConnectionString).then((onful, onrej) => console.log(onful));

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

const port = process.env.PORT || 5000;
app.listen(port);//