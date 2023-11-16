const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email: email });

    if (user) {
        return res.json({ error: 'This email is address already registered.' });
    } else {
        try {
            const response = await User.create({
                name,
                email,
                password: hashPassword
            })
        } catch (err) { console.log(err); }
        return res.json({ status: 'success', redirect: '/auth/success' });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    const isPasswordValid = user && await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)

    if (!user || !isPasswordValid) {
        return res.json({ error: "wrong credentials!" });
    } else {
        return res.json({ message: "Logged in successfully!", data: user, status: "ok", redirect: '/profile' });
    }
})

module.exports = router;