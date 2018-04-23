
const Vendor = require('../../db').Vendor

const  route = require('express').Router()


route.get('/' ,(req,res)=>{
    //
        Vendor.findAll()
        .then((vendor)=>{
        res.status(200).send(vendor)
        })
        .catch((err)=>{
            res.status(500).send({
                error : "could not retrieve products "
            })
        })
})

route.post('/', (req,res)=>{
    // console.log(req.body.name)
    Vendor.create({
        name: req.body.name
    }).then((vendor)=>{
        res.status(201).send(vendor)
    }).catch((err)=>{
         console.log(err)
         res.status(501).send({
             error : "could not retrieve products "
         })
    })
})

exports = module.exports = route