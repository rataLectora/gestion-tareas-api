import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            message: "Acceso denegado. Se requiere un token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // guardamos info del usuario en la request

        next(); // permitimos continuar
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
};