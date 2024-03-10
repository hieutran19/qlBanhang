const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comment");
const ejs = require("ejs");
const config = require("config");
const path = require("path");
const transporter = require("../../common/transporter");

const home = async (req, res)=>{

    const featured = await ProductModel.find({
        featured: true,
        is_stock: true,
    })
        .sort({_id: -1})
        .limit(6);
    const latest = await ProductModel.find({
        is_stock: true,
    })
        .sort({_id: -1})
        .limit(6);

    res.render("site/index", {featured, latest});
}
const category = async (req, res)=>{
    const id = req.params.id;
    const products = await ProductModel.find({cat_id: id});
    const category = await CategoryModel.findById(id);
    const title = category.title;
    const total = products.length;
    res.render("site/category", {products, title, total});
}
const product = async (req, res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id: id}).sort({_id: -1});
    console.log(comments);
    res.render("site/product", {product, comments});
}
const search = async (req, res)=>{
    const keyword = req.query.keyword;
    const products = await ProductModel.find({$text: {$search: keyword}});
    res.render("site/search", {products});
}
const comment = async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const comment = {
        prd_id: id,
        full_name: body.full_name,
        email: body.email,
        body: body.body,
    }
    await new CommentModel(comment).save();
    // console.log(comment);
    res.redirect(req.path);
}
const addToCart = async (req, res)=>{
    const body = req.body;
    let items = req.session.cart;
    let isProductExists = false;
    items.map((item, index)=>{
        if(item.id===body.id){
            item.qty += parseInt(body.qty);
            isProductExists = true;
        }
        return item;
    });
    if(!isProductExists){
        const product = await ProductModel.findById(body.id);
        items.push({
            id: product._id,
            name: product.name,
            price: product.price,
            thumbnail: product.thumbnail,
            qty: parseInt(body.qty),
        });
    }
    req.session.cart = items;
    res.redirect("/cart");
}
const cart = (req, res)=>{
    const products = req.session.cart;
    res.render("site/cart", {products, totalPrice: 0});
}
const updateCart = (req, res)=>{
    const products = req.body.products;
    let items = req.session.cart;
    items.map((item, index)=>{
        if(products[item.id]){
            item.qty = parseInt(products[item.id].qty);
        }
        return item;
    });
    req.session.cart = items;
    res.redirect("/cart");
    // console.log(products);
}
const delCart = (req, res)=>{
    const id = req.params.id;
    let items = req.session.cart;
    const newItems = items.filter((item, index)=>{
        if(item.id != id){
            return true;
        }
    });
    req.session.cart = newItems;
    res.redirect("/cart");
}
const order = async (req, res)=>{
    const body = req.body;
    const viewPath = req.app.get("views");
    const html = await ejs.renderFile(
        path.join(
            viewPath,
            "site/email-order.ejs"
        ),
        {
            name: body.name,
            phone: body.phone,
            add: body.add,
            items: req.session.cart,
            totalPrice: 0,
        }
    );
    // console.log(body);
    await transporter.sendMail({
        to: body.mail,
        from: "Vietpro Shop",
        subject: "Xác nhận đơn hàng từ Vietpro Shop",
        html,
    });
    req.session.cart = [];
    res.redirect("/success");
}
const success = (req, res)=>{
    res.render("site/success");
}
module.exports = {
    home,
    category,
    product,
    comment,
    search,
    addToCart,
    cart,
    updateCart,
    delCart,
    order,
    success,
}