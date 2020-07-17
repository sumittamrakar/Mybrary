if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Wire up controller
const indexRouter = require('./routes/index')

// Configure express application
app.set('view engine', 'ejs')
// Where the server render views come from = views directory
app.set('views', __dirname + '/views') // Where the views come from = views directory
// Everything about layout is going to be in layout file to avoid duplicating beginning and ending HTML (header/footer)
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
// Location for public files Javscript, styles, images
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)