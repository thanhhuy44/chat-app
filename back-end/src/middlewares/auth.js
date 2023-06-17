import jwt from "jsonwebtoken";

const verifyJwtToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      const decoded = await verifyJwtToken(token, process.env.TOKEN_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        message: "Unauthorized access.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

const authenticateRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers["x-access-refresh-token"];

  if (refreshToken) {
    try {
      const decoded = await verifyJwtToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      req.decoded = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        message: "Unauthorized access.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No refresh token provided.",
    });
  }
};

const authMiddlwares = {
  authenticateToken,
  authenticateRefreshToken,
};

export default authMiddlwares;
