const UserModel = require("../models/user");
const ProductModel = require("../models/product");

const index = async (req, res)=>{

    const users = await UserModel.find();
    const products = await ProductModel.find();
    // console.log(users.length);
    // console.log(products.length);

    res.render("admin/dashboard", {users: users.length, products: products.length});
}

module.exports = {
    index:index,
}