const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");

// Import Controller
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const SiteController = require("../apps/controllers/site");
const { route } = require("../apps/app");

const Home = (req, res)=>{
    res.send("<h1>Home Page</h1>");
}

// Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.get("/del-cart-:id", SiteController.delCart);
router.get("/cart", SiteController.cart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);


// Router Admin
router.get("/test", TestController.test);
router.post("/test2", UploadMiddleware.single("thumbnail"), TestController.test2);
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.login);
router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout", AuthController.logout);

router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);

router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store", UploadMiddleware.single("thumbnail"), AuthMiddleware.checkAdmin, ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id", UploadMiddleware.single("thumbnail"), AuthMiddleware.checkAdmin, ProductController.update);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, ProductController.del);  


module.exports = router;