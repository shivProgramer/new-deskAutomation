
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }
  // Check if token is prefixed with "Bearer " and extract the token part
  const tokenParts = token.split(" ");
  if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
    return res
      .status(400)
      .json({ error: "Malformed token. Ensure token starts with 'Bearer '" });
  }
  const actualToken = tokenParts[1];
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};
