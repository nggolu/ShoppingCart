// const  route = require('express').Router()
// const { User }  = require('../../db')
// const session = require('express-session')
// const passport = require('../../passport')
//
// route.use(session({
//     secret: 'some very very secret thing',
//     resave: false,
//     saveUninitialized: true
// }))
// route.use(passport.initialize())
// route.use(passport.session())
//
// route.post('/signup', (req, res) => {
//     User.create({
//     username: req.body.username,
//     password: req.body.password
//     }).then((user) => {
//         if (user) {
//             res.redirect('/signin.html')
//         }
//     }).catch((err) => res.send("ERROR CREATING USER"))
// })
//
// route.post('/signin', passport.authenticate('local', {
//     failureRedirect: '/signin.html',
//     // successRedirect: 'profile'
//     successRedirect: '../../index.html'
// }))
//
// route.get('/profile', (req, res) => {
//     // Available to only logged in people
//     // Data is different (each user sees own profile)
//     // console.log(req)
//     if (req.user) {
//         res.json(req.user)
//     } else {
//         res.send("YOU ARE NOT LOGGED IN")
//     }
//
// })
//
// exports = module.exports = route