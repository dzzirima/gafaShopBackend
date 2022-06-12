/**This middleware ensures that only authorised users can  access the routes */
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No Auth Token Access  denied" });

    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed , authorization denied." });
    req.id = verified.id
    req.token = token
    next()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
