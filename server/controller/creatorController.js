const storage = require("../firebaseConfig");
const creatorService = require("../service/creatorService");

// get creators
const getCreators = async (req, res) => {
  try {
    const data = await creatorService.getCreators();

    return res.json({
      status: 200,
      message: "Successfully get creators",
      data,
    });
  } catch (error) {
    console.log(error, "from get creator method controller");
    return res.json({ status: 400, error });
  }
};

const getCreatorById = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const data = await creatorService.getCreatorById({ creatorId });

    return res.json({
      status: 200,
      message: "Successfully get creator by id",
      data,
    });
  } catch (error) {
    console.log(error, "from get creator method controller");
    return res.json({ status: 400, error });
  }
};

const getDashboardContents = async (req, res) => {
  try {
    const data = await creatorService.getDashboardContents();

    return res.json({
      status: 200,
      message: "Successfully get dashboard contents",
      data,
    });
  } catch (error) {
    console.log(error, "from get dashboard content method controller");
    return res.json({ status: 400, error });
  }
};

const getContents = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const { role } = req.user;
    const data = await creatorService.getContents({
      creatorId,
      role,
    });

    return res.json({
      status: 200,
      message: "Successfully get contents",
      data,
    });
  } catch (error) {
    console.log(error, "from get content method controller");
    return res.json({ status: 400, error });
  }
};

const getContentById = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const { contentId } = req.params;
    const data = await creatorService.getContentById({
      userId: _id,
      role,
      contentId,
    });

    return res.json({
      status: 200,
      message: "Successfully get contents by id",
      data,
    });
  } catch (error) {
    console.log(error, "from get content by id method controller");
    return res.json({ status: 400, error });
  }
};

const addContent = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, description, category, tags, status } = req.body;

    const data = await creatorService.addContent({
      userId: _id,
      title,
      description,
      category,
      tags,
      status,
      file: req.file,
    });

    return res.json({
      status: 200,
      message: "Successfully added content",
      data,
    });
  } catch (error) {
    console.log(error, "from add content method controller");
    return res.json({ status: 400, error });
  }
};

const approveContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const data = await creatorService.approveContent({
      contentId,
    });

    return res.json({
      status: 200,
      message: "Successfully approved content by admin",
      data,
    });
  } catch (error) {
    console.log(error, "from get content by id method controller");
    return res.json({ status: 400, error });
  }
};

const addFeedbackToContent = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contentId } = req.params;
    const { message, rating } = req.body;

    const data = await creatorService.addFeedbackToContent({
      contentId,
      userId: _id,
      message,
      rating,
    });

    return res.json({
      status: 200,
      message: "Successfully added feedback to content content",
      data,
    });
  } catch (error) {
    console.log(error, "from get content by id method controller");
    return res.json({ status: 400, error });
  }
};

const deleteContentById = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contentId } = req.params;

    const data = await creatorService.deleteContentById({
      contentId,
      userId: _id,
    });

    return res.json({
      status: 200,
      message: "Successfully deleted content",
      data,
    });
  } catch (error) {
    console.log(error, "from get content by id method controller");
    return res.json({ status: 400, error });
  }
};

const editContentById = async (req, res) => {
  try {
    const { _id } = req.user;
    const { contentId } = req.params;
    const { title, description, category, tags, status } = req.body;

    console.log(
      {
        userId: _id,
        contentId,
        title,
        description,
        category,
        tags,
        status,
        file: req.file,
      },
      "from controller"
    );
    const data = await creatorService.editContentById({
      userId: _id,
      contentId,
      title,
      description,
      category,
      tags,
      status,
      file: req.file,
    });

    return res.json({
      status: 200,
      message: "Successfully edited content",
      data,
    });
  } catch (error) {
    console.log(error, "from add content method controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  getCreators,
  getCreatorById,
  getDashboardContents,
  getContents,
  getContentById,
  addContent,
  approveContent,
  addFeedbackToContent,
  deleteContentById,
  editContentById,
};
