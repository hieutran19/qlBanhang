const multer = require("multer");
const config = require("config");
module.exports = multer({
    dest: config.app.tmp,
});