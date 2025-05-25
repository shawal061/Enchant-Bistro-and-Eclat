const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const mongoDB = require('./db')
mongoDB();

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'authToken'],
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderAPI"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})