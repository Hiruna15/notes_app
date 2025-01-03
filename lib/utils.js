import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import fs from "fs";

const hashPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return { salt, hash };
};

const checkPassword = (password, salt, hash) => {
  const validatedHashed = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

  return hash === validatedHashed;
};

const issueJwt = (userId, username) => {
  const payload = {
    id: userId,
    username,
  };

  const REFRESH_TOKEN_PRIV_KEY = fs.readFileSync("refreshToken_privateKey.pem");
  const ACCESS_TOKEN_PRIV_KEY = fs.readFileSync("accessToken_privateKey.pem");

  const access_token = jwt.sign(payload, ACCESS_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "15m",
  });

  const refresh_Token = jwt.sign(payload, REFRESH_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  const token = `Bearer ${access_token}`;

  return { access_token: token, refresh_Token };
};

export { hashPassword, checkPassword, issueJwt };
