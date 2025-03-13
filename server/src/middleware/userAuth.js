import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("i am token", token);

  if (!token) {
    return res.status(400).json("Unauthorized user");
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Error Authorizing", error.message);
  }
};
