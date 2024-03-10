const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

const test = (req, res) => {

    res.render("test");
}
const test2 = (req, res) => {
    
    console.log(req.body);
}

module.exports = {
    test: test,
    test2: test2,
}