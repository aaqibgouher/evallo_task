const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN") throw "Only admins are allowed";

    next();
  } catch (error) {
    return res.json({ status: 401, error });
  }
};

const isCreator = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "CREATOR") throw "Only Creators are allowed";

    next();
  } catch (error) {
    return res.json({ status: 401, error });
  }
};

const isAdminOrCreator = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (!(role === "ADMIN" || role === "CREATOR"))
      throw "Only Admins/Creators are allowed";

    next();
  } catch (error) {
    return res.json({ status: 401, error });
  }
};

module.exports = {
  isAdmin,
  isCreator,
  isAdminOrCreator,
};
