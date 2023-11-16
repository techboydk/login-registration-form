const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
require('./db'); // Import the database connection

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/:q', (req, res) => {
    const q = req.params.q; // Access the parameter using req.params.q

    if (q === 'login') {
        res.sendFile(__dirname + '/pages/login.html');
    } else {
        res.sendFile(__dirname + '/pages/register.html');
    }
});


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (user) {
            res.redirect('/userexist');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/success');
    } catch (error) {

        res.redirect('/error');
    }
});
app.post('/login', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (user) {
            res.redirect('/userexist');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/success');
    } catch (error) {

        res.redirect('/error');
    }
})


app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/pages/success.html');
})

app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/pages/error.html');
})
app.get('/userexist', (req, res) => {
    res.sendFile(__dirname + '/pages/userexist.html');
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
