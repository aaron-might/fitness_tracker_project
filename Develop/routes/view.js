const router = require("express").Router();
const path = require("path");

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'))
//     //res.sendFile("/static/index.html")
//   })

router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
    //res.sendFile("/static/index.html")
})

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
    //res.sendFile("/static/index.html")
})

module.exports = router;