import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
const { sign } = jsonwebtoken;
dotenv.config();

// signing the access token
const createAccessToken = (id) => {
  return sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 15 * 60, // 15 min
  });
};

// signing the refresh token
const createRefreshToken = (id) => {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "90d",
  });
};

// sending the access token to the client
const sendAccessToken = (_req, res, accesstoken) => {
  res.json({
    accesstoken,
    message: "Sign in Successful",
    type: "success",
  });
};

// sending the refresh token to the client as a cookie
const sendRefreshToken = (res, refreshtoken) => {
  res.cookie("refreshtoken", refreshtoken, {
    hhtpOnly: true,
  });
};

export default createAccessToken;
export { createRefreshToken, sendAccessToken, sendRefreshToken };
