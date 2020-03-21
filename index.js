require('./services/auth/passport');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(authRoutes);

const port = process.env.PORT || 5000;
app.listen(port);