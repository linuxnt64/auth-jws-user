const router = require('express').Router();     // Länka (bara) metoden Router från expressmodulen
// todo: import user model
const User = require('../model/User')
// todo: import validation function
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');  // hashar vårt lösenord
const jwt = require('jsonwebtoken');  // importerar vår jsonwebtok

router.post('/register', async (req, res) => {

    //validate user
    const { error } = registerValidation(req.body); //Vi plockar ut error objektet ur validation (de/con)structur'ing)
   console.log(error);
    if (error) {
        return res.status(400).json({ error });
    }

    //if ok (existing user)
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);                            // hur säker ska vårt lösenord vara?
    const hashPassword = await bcrypt.hash(req.body.password, salt);  // gör en hash av pasword

    //create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.json({ user: user._id, redirect: 'batcave', token });
    } catch (error) {
        res.status(400).json(error);
    }

});


router.post('/login', async (req, res) => {
    console.log(req.body);
    //validate user
    const { error } = loginValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        console.log(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: 'Email not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);  //Skapar token att skicka till frontend
    res.header('auth-token', token).json({ token: token, redirect: 'batcave' }) // Skapar headern till svaret på /login POST
});

module.exports = router;