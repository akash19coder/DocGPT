import jwt from "jsonwebtoken";
export const getUserFromToken = (req, res, next) => {
    const userToken = req.signedCookies["auth-token"];
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const decoded = jwt.verify(userToken, privateKey);
    req.locals = decoded;
    next();
};
//# sourceMappingURL=user-decoder.js.map