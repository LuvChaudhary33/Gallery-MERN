const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV==="production"? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
    });
}

module.exports = generateToken;