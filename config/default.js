module.exports = {
    app: {
        port: 3000,
        static_folder: __dirname + "/../src/public",
        views_folder: __dirname + "/../src/apps/views",
        view_engine: "ejs",
        tmp: __dirname + "/../src/tmp",
    },
    mail: {
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: "vietpro.shop28@gmail.com",
            pass: "poatsqacxsytryzs",
        }
    }

}