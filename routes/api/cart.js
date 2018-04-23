const  route = require('express').Router()
const Cart  = require('../../db').Cart
const Product  = require('../../db').Product
const Vendor  = require('../../db').Vendor

route.get('/' ,(req,res)=>{
    //
    // console.log(req.user)

    if(req.user) {

        // console.log(req.user)
        // console.log(req)
        Cart.findAll({
            include: [
                {
                    model: Product,
                    include: [Vendor]
                }
            ],
            where : {userId : req.user.id}

        }).then((carts) => {
            res.status(200).send(carts)
        }).catch((err) => {
                console.log(err)
            res.status(500).send({
                error: "could not retrieve products "
            })
        })
    }
    else{
        console.log("not define")
        // res.redirect('./signup')
        res.send({status : true})
    }
})

route.post('/', (req,res)=>{
        // console.log(req.body.productId)

    if(req.user)
    {
        var id= req.user.id;
        Cart.findOne({
            where : {productId : req.body.productId}
        }).then((cart)=>{
            if(cart){
                console.log(" update")
                cart.updateAttributes({
                    quantity : cart.quantity+1
                })
                res.status(200).send(cart)
            }
            else{
                    Cart.create({
                    productId : req.body.productId,
                    quantity : 1,
                    userId: id

                })
                res.status(200).send("new cart is created")
            }
        })
        .catch((err)=>{
            // console.log(err)
            res.status(501).send({
                error : "could not retrieve products "
            })
        })
    }else{
            console.log(" not login")
        res.send({
            status:false
        })
    }


})
route.post('/add', (req,res,next)=>{
        console.log(req.body.id)
        console.log(req.body.quantity)
        Cart.findOne({
            where : {productId : req.body.id}
        }).then((cart)=>{
            if(cart){
                console.log(" update")
                if(cart.quantity ==1 && req.body.quantity === -1){
                    console.log("delete row")
                    cart.destroy({
                        where: {
                            id : cart.id
                        }
                    }).then(()=>{
                        res.status(201).send("cart deleted")
                    })
                }
                else{
                    cart.quantity = cart.quantity + req.body.quantity
                    cart.save().then((carts)=>{
                        res.status(200).send(carts)
                }).catch((err)=>{
                        console.log(err)
                    res.status(501).send({
                        error : "could not retrieve products "
                    })
                })
                }

            }


        })/*.catch((err)=>{
            console.log(err)
            res.status(501).send({
                error : "could not retrieve products "
            })
        })*/
    // next()
})

/*route.use('/' ,(req,res)=>{
    //
    console.log(" hello")
    Cart.findAll({
    include :[
        {
            model : Product,
            include:[Vendor]
        }
    ]
    })
    .then((carts)=>{
        res.status(200).send(carts)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
            error : "could not retrieve products "
        })
    })
})*/

exports = module.exports= route