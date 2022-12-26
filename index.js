const express = require('express')
const {engine} = require('express-handlebars')
// var engi = require('express-handlebars');
const { auth } = require('express-openid-connect');
const path = require('path')
const { Route } = require('react-router-dom')
const app = express()
const port = 3000
// const firebase = require('firebase-auth');
// app.use(express.static(path.join(__dirname,"static")))
app.use(express.static("images"));
// app.use(auth(config));
app.use('/',require(path.join(__dirname,"routes/blog.js")))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})