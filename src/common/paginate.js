module.exports = (page, totalPage, delta = 2) => {

    const pages = [];
    const left = page - delta;
    const right = page + delta;

    for (i = 1; i <= totalPage; i++) {
        if (
            i == 1 ||
            i == totalPage ||
            i == page ||
            (i >= left) && (i <= right)
        ) {
            pages.push(i);
        }
        else if (
            i + 1 == left ||
            i - 1 == right
        ) {
            pages.push("...");
        }
    }
    return pages;
}