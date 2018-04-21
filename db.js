const Sequelize  = require('sequelize')

const db = new Sequelize( 'shoppingdatabase', 'root','root',{
    dialect : 'mysql',
    host : 'localhost'
})


const Vendor = db.define('vendors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false
    }
})
const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    price : {
        type: Sequelize.FLOAT(),
        allowNull:false
    }

})
const Cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity : {
        type: Sequelize.INTEGER(),
        allowNull:false
    }

})

Cart.belongsTo(Product);
Product.belongsTo(Vendor);
// Vendor.hasMany(Product, {as : 'vendorId'})
// Vendor.belongsTo(Product, {foreignKey: 'Vendor.id', as: 'vendor_id'});
db.sync()
    .then(()=>console.log("database has been connected"))
    .catch((err)=>console.log("error connectiong with db"))
exports = module.exports = {
    Product ,Vendor , Cart
}

