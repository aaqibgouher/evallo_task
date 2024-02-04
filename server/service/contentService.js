const { ContentModel } = require("../models");

const getContents = async () => {
  //   return those contents which are approved by admin & published by creators
  return await ContentModel.find({ isApproved: true, status: "PUBLISHED" });
};

module.exports = {
  getContents,
};
