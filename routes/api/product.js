
const Product  = require('../../db').Product
const Vendors = require('../../db').Vendor
const  route = require('express').Router()

route.get('/' ,(req,res)=>{
    // console.log(req.user)

        Product.findAll({
            include: [
                    { model: Vendors/*, as 'id', where : {id : 'Product.vendor_id'}*/}
                ]
            })
           .then((products)=>{
                res.status(200).send(products)
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({
                    error : "could not retrieve products "
                })
            })

})
route.get('/:id' ,(req,res)=>{
    // console.log(req.params.id)
    Product.findAll({
        include: [
            { model: Vendors/*, as 'id', where : {id : 'Product.vendor_id'}*/}
        ],
        where : { vendorId : req.params.id}
    })
    .then((products)=>{
        res.status(200).send(products)
    })
    .catch((err)=>{
        console.log(err)
        res .status(500).send({
        error : "could not retrieve products "
    })
    })
})

route.post('/', (req,res)=>{


            Product.create({
                    name: req.body.name,
                    price: parseFloat(req.body.price),
                    vendorId: parseInt(req.body.vendorId),

                }).then((product) => {

                    res.status(201).send(product)
            }).
                catch((err) => {
                    // console.log(err)
                    res.status(501).send({
                    error: "could not post  products "
                })
            })

})

exports = module.exports= route