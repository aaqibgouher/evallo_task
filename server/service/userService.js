const { UserModel, TokenModel } = require("../models");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const register = async (payload) => {
  // basic validations
  if (!payload || !payload.name) throw "Name is required";
  if (!payload || !payload.email) throw "Email is required";
  if (!payload || !payload.password) throw "Password is required";

  const { name, email, password, role } = payload;
  console.log(payload, "from payload");

  // email validation
  if (!isEmail(email)) throw "Valid email is required";

  // check user by email
  let user = await getUserByEmail(email);

  if (user) throw "Email already exists";

  //   insert user
  user = new UserModel({
    name,
    email,
    password: await hashPassword(password),
    role: role || "USER",
  });

  //   save user
  user = await user.save();

  return { id: user._id, email, role: user.role };
};

const login = async (payload) => {
  if (!payload || !payload.email) throw "Email is required";
  if (!payload || !payload.password) throw "Password is required";

  const { email, password } = payload;

  // email validation
  if (!isEmail(email)) throw "Valid email is required";

  // check user by email
  let user = await getUserByEmail(email, true);

  if (!user) throw "Invalid email";

  //   compare password
  if (!(await comparePassword(password, user.password)))
    throw "Invalid email/password";

  // generate token
  const token = await generateToken({ userId: user._id });

  //   insert in tokens collection
  const tokenObj = new TokenModel({
    user: user._id,
    token,
  });

  await tokenObj.save();

  return { email, role: user.role, userId: user._id, token };
};

const logout = async (payload) => {
  // taking value
  const { userId, token } = payload;

  //   remove token from db
  return await TokenModel.deleteOne({ user: userId, token });
};

const isEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};

const getUserByEmail = async (email, password = false) => {
  return password
    ? await UserModel.findOne({ email })
    : await UserModel.findOne({ email }).select("-password");
};

const hashPassword = async (password) => {
  // Hash the password
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

const generateToken = async (payload) => {
  return await JWT.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

// verify token
const verifyToken = async (payload) => {
  return await JWT.verify(payload.token, process.env.TOKEN_SECRET);
};

// get user by id, default password hidden else do
const getUserById = async (id, password = false) => {
  return password
    ? await UserModel.findOne({ _id: id })
    : await UserModel.findOne({ _id: id }).select("-password");
};

// get user token by user & token
const getUserTokenByUserIdAndToken = async (userId, token) => {
  return await TokenModel.findOne({ user: userId, token });
};

module.exports = {
  register,
  isEmail,
  getUserByEmail,
  login,
  comparePassword,
  verifyToken,
  getUserById,
  getUserTokenByUserIdAndToken,
  logout,
};
