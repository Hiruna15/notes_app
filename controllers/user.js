import UserModel from "../models/user.js";
import { issueJwt, checkPassword } from "../lib/utils.js";
import { BadRequest, InternalServerError, NotFound } from "../errors/index.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!req.body) {
    return next(new BadRequest("Body has not been provided"));
  }

  try {
    const newUser = await UserModel.create({ username, email, hash: password });
    if (!newUser) {
      return next(
        new InternalServerError(
          "something wrong with the server, Please try againg later"
        )
      );
    }

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.username
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  if (!req.body) {
    return next(new BadRequest("Body has not been provided"));
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return next(new BadRequest("username and password must be provided"));
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return next(new NotFound("User not found"));
    }

    if (!checkPassword(password, user.salt, user.hash)) {
      return next(new BadRequest("Invalid Password"));
    }

    const { access_token, refresh_Token } = issueJwt(user._id, user.username);

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
};

export { register, login, logout };
