
const express = require('express');
const app = express();
const mongoose = require('mongoose');   // Hanterar schema-struktur för dokumenten i databasen
const dotenv = require('dotenv');       // Hanterar gömda data (lösenord och secrets) i lokalfil
dotenv.config();                        // En metod , skapar en instans av dotenv
const PORT = process.env.PORT;

const pages = require('./routes/pages.js')
const authRoute = require(('./routes/auth.js'))
const secureRoute = require(('./routes/secure.js'))

mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology:true, useNewURLparser: true}, () => {
    console.log('Connected to DB');
});
app.use(express.json());
app.use('/api/user', authRoute); // logga in och sign up user
app.use('/api/secure', secureRoute); // logga in och sign up user

app.use(express.static('public'));

app.use('/', pages)

app.listen(PORT, () => {
    console.log(`Backend server running on ${PORT}`);
})
