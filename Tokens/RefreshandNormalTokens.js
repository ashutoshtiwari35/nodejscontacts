
const jwt = require("jsonwebtoken");

// Access Token (short expiry)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

// Refresh Token (long expiry)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };



const loginUser = async (req, res) => {
    // validate user (DB check)
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    // store refresh token (DB or cookie)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  
    res.json({ accessToken });
  };
  

  
const refreshTokenHandler = (req, res) => {
    const token = req.cookies.refreshToken;
  
    if (!token) return res.status(401).json({ message: "No refresh token" });
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });
  
      const accessToken = generateAccessToken({ _id: user.id });
      res.json({ accessToken });
    });
  };
  

