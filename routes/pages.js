const express = require('express');			// Hämta in modulen express till objektet express 
const router = express.Router();			// Hämta in moduldelen expressrouter till objektet router 
const path = require('path');

router.get('/batcave', (req,res) => {
    res.sendFile(path.resolve('public/batcave.html'))
});

module.exports = router;