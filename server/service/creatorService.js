const storage = require("../firebaseConfig");
const { UserModel, ContentModel } = require("../models");
const path = require("path");

const getCreators = async () => {
  return await UserModel.find({ role: "CREATOR" }).select("-password");
};

const getCreatorById = async (payload) => {
  if (!payload || !payload.creatorId) throw "Creator id is required";

  return await UserModel.findById({ _id: payload.creatorId });
};

const getDashboardContents = async () => {
  //   return those contents which are approved by admin & published by creators
  return await ContentModel.find({
    isApproved: true,
    status: "PUBLISHED",
  }).populate({
    path: "user",
    select: "_id name role",
  });
};

const getContents = async (payload) => {
  if (!payload || !payload.creatorId) throw "Creator id is required";
  if (!payload || !payload.role) throw "Role is required";

  const { creatorId, role } = payload;

  if (role === "ADMIN") {
    return await getAllContents();
  } else if (role === "CREATOR") {
    return await getContentsByCreator({ creatorId });
  } else {
    return [];
  }
};

const getAllContents = async () => {
  return await ContentModel.find();
};

const getContentsByCreator = async (payload) => {
  if (!payload || !payload.creatorId) throw "Creator id is required";

  const { creatorId } = payload;

  return await ContentModel.find({ user: creatorId });
};

const getContentById = async (payload) => {
  if (!payload || !payload.contentId) throw "Content id is required";
  if (!payload || !payload.role) throw "Role is required";
  if (!payload || !payload.userId) throw "User id is required";

  const { contentId, role, userId } = payload;

  const content = await getContentByContentId({ contentId });

  if (!content) throw "Content does not exists";

  //   if exist, check its status, only publised
  //   admin/creator are allowed to get unpublised contents, but for those who are not, they will get error
  if (
    role === "ADMIN" ||
    (role === "CREATOR" && isEqualMongo(userId, content?.user._id))
  ) {
    return content;
  } else {
    if (content.isApproved) {
      return content;
    } else {
      throw "You are not allowed to access content";
    }
  }
};

const addContent = async (payload) => {
  //   validations
  if (!payload || !payload.userId) throw "User is required";
  if (!payload || !payload.title) throw "Title is required";
  if (!payload || !payload.category) throw "Category is required";

  const { userId, title, description, category, tags, status, file } = payload;
  let fileDetail = "";

  //   if file is present, upload on firebase storage, get a link
  if (file) {
    fileDetail = await uploadFileOnFirebase(file);
  }

  const content = new ContentModel({
    user: userId,
    title,
    description: description || "",
    category,
    tags: tags ? tags.split(",") : [],
    metadata: { fileDetail },
    status: status || "DRAFT",
  });

  return await content.save();
};

const uploadFileOnFirebase = async (file) => {
  try {
    const bucket = storage.bucket();
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    const fileUpload = bucket.file(uniqueFilename);
    let downloadUrl = "";

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        // Generate a public URL after the file is uploaded
        await fileUpload.makePublic(); // Make the file publicly accessible
        downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

        resolve(downloadUrl);
      });

      stream.on("error", (error) => {
        reject(error);
      });

      stream.end(file.buffer);
    });

    // Return the downloadUrl
    return {
      filename: fileUpload.name,
      size: file.size,
      downloadUrl: downloadUrl,
    };
  } catch (error) {
    console.error(error, "from upload file");
    throw error; // Rethrow the error to handle it in the calling function or controller
  }
};

const approveContent = async (payload) => {
  //   validations
  if (!payload || !payload.contentId) throw "Content Id is required";

  const { contentId } = payload;

  //   check content exists by id
  let content = await getContentByContentId({
    contentId,
  });

  if (!content) throw "Content does not exists";

  //   update
  content.isApproved = true;
  content.status = "PUBLISHED";

  return await content.save();
};

const getContentByContentId = async (payload) => {
  if (!payload || !payload.contentId) throw "Content Id is required";

  return await ContentModel.findOne({
    _id: payload.contentId,
  })
    .populate({
      path: "user",
      select: "_id name role",
    })
    .populate({
      path: "feedbacks.from",
      model: UserModel,
      select: "_id name role", // Select the fields you want from the UserModel
    });
};

const isEqualMongo = (first, second) => {
  return first.equals(second);
};

const addFeedbackToContent = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.contentId) throw "Content id is required";
  if (!payload || !payload.message) throw "Message is required";
  if (!payload || !payload.rating) throw "Rating is required";

  const { userId, contentId, message, rating } = payload;

  let content = await getContentByContentId({ contentId });

  if (!contentId) throw "Content does not exists";

  // updated feedback
  content.feedbacks = [...content.feedbacks, { from: userId, message, rating }];

  return await content.save();
};

const deleteContentById = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.contentId) throw "Content id is required";

  const { userId, contentId } = payload;

  // check if content exists
  let content = await getContentByContentId({ contentId });

  console.log(content, "content");
  if (!content) throw "Content does not exists";

  // if exists check its logged in user content
  if (!isEqualMongo(content.user._id, userId))
    throw "You can only delete your content";

  // delete
  return await ContentModel.deleteOne({ _id: contentId });
};

const editContentById = async (payload) => {
  console.log(payload, "from ");

  //   validations
  if (!payload || !payload.userId) throw "User is required";
  if (!payload || !payload.contentId) throw "Content Id is required";
  if (!payload || !payload.title) throw "Title is required";
  if (!payload || !payload.category) throw "Category is required";

  const {
    userId,
    title,
    description,
    category,
    tags,
    status,
    file,
    contentId,
  } = payload;

  // get content by id
  let content = await getContentByContentId({ contentId });

  if (!content) throw "Content does not exists";

  // only able to update their own content
  if (!isEqualMongo(userId, content.user._id))
    throw "You can only edit your contents";
  content.title = title || content.title;
  content.description = description || content.description;
  content.category = category || content.category;
  content.tags = tags?.split(",") || content.tags;

  return await content.save();
};

module.exports = {
  getCreators,
  getCreatorById,
  getDashboardContents,
  getAllContents,
  getContents,
  getContentsByCreator,
  getContentById,
  addContent,
  uploadFileOnFirebase,
  approveContent,
  getContentByContentId,
  isEqualMongo,
  addFeedbackToContent,
  deleteContentById,
  editContentById,
};
