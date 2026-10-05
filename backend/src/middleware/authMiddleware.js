const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Accès non autorisé"
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const user = jwt.verify(token, jwtConfig.secret);

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};

module.exports = authMiddleware;