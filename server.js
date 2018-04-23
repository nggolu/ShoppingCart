/*
 *  Nishant Garg
 */
const  express = require('express')
const path = require('path')
const { User }  = require('./db')
const session = require('express-session')
const passport = require('./passport')


const app = express()

app.use(session({
    secret: 'some very very secret thing',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())
app.use(passport.session())

app.post('/signup', (req, res) => {
    User.create({
    username: req.body.username,
    password: req.body.password
}).then((user) => {
    if (user) {
        res.redirect('/signin.html')
    }
}).catch((err) => res.send("ERROR CREATING USER"))
})

app.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin.html',
    // successRedirect: 'profile'
    successRedirect: '/index.html'
}))

// app.get('/profile', (req, res) => {
//     // Available to only logged in people
//     // Data is different (each user sees own profile)
//     // console.log(req)
//     if (req.user) {
//     res.json(req.user)
// } else {
//     res.send("YOU ARE NOT LOGGED IN")
// }
//
// })



app.use('/',express.static(path.join(__dirname,'public')))
app.use('/api',require('./routes/api').route)

app.listen(8080 ,()=>console.log("server started at http://localhost:8080/ "))