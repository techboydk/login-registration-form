const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth')
require('./db'); // Import the database connection

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})

app.get('/:q', (req, res) => {
    const { q } = req.params;
    if (q === "profile") {
        res.sendFile(__dirname + "/pages/index.html");
    }
})

app.get('/auth/:q', (req, res) => {
    const { q } = req.params;
    if (q === "login") {
        return res.sendFile(__dirname + '/pages/login.html');
    } else if (q === "success") {
        return res.sendFile(__dirname + '/pages/success.html');
    } else {
        return res.sendFile(__dirname + '/pages/register.html');
    }
});

app.use('/auth', authRoutes)







app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
