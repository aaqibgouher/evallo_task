const userService = require("../service/userService");

// register
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await userService.register({ name, email, password, role });

    return res.json({ status: 200, message: "Successfully registered", data });
  } catch (error) {
    console.log(error, "from register method controller");
    return res.json({ status: 400, error });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await userService.login({ email, password });

    return res.json({ status: 200, message: "Successfully login", data });
  } catch (error) {
    console.log(error, "from login method controller");
    return res.json({ status: 400, error });
  }
};

// get me
const getMe = async (req, res) => {
  try {
    const data = req.user;

    return res.json({ status: 200, message: "Successfully get me", data });
  } catch (error) {
    console.log(error, "from get me method controller");
    return res.json({ status: 400, error });
  }
};

// logout
const logout = async (req, res) => {
  try {
    // calling service
    const data = await userService.logout({
      userId: req.user._id,
      token: req.token,
    });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully logout",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from logout controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
