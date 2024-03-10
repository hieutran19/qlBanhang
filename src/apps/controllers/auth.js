const UserModel = require("../models/user");
const login = (req, res)=>{
    res.render("admin/login", {data:{}});
}
const postLogin = async (req, res)=>{  
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.find({email: email, password: password});
    // console.log(user);
    let error;
    if(email==""){
        error = "Email không được để trống !";
    }
    else if(password==""){
        error = "Mật khẩu không được để trống !";
    }
    else if(user.length > 0){
        req.session.email = email;
        req.session.password = password;
        res.redirect("/admin/dashboard");
    }
    else{
        error = "Tài khoản không hợp lệ!";
    }
    res.render("admin/login", {data:{error:error}});
    // console.log(error);
}
const logout = (req, res)=>{
    res.send("/admin/logout");
}

module.exports = {
    login:login,
    logout:logout,
    postLogin:postLogin,
}