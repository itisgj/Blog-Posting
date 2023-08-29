const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')


app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

app.use(authRouter)
app.use(postRouter)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(4000)
    } catch (error) {
        console.log(error)
    }
}

start()
