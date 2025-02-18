const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
    return res.status(401).render("unauthorized");
    }

    jwt.verify(token, "#HRTSTR32#", (err, user) => {
    if (err) {
    return res.status(403).render("unauthorized");
    }
    req.userId = user.userId;
    next();
});
}

export default authentication;