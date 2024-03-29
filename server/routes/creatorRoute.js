const express = require("express");
const router = express.Router();
const creatorController = require("../controller/creatorController");
const {
  isAdmin,
  isAdminOrCreator,
  isCreator,
} = require("../middleware/adminMiddleware");
const uploadFile = require("../service/fileUploadService");

// get all creators
router.get("/", isAdmin, creatorController.getCreators);

// get contents for dashboard
router.get("/dashboard", creatorController.getDashboardContents);

// approve content
router.get("/:contentId/approve", isAdmin, creatorController.approveContent);

// get creator by id
router.get("/:creatorId", isAdmin, creatorController.getCreatorById);

// get contents by id
router.get(
  "/:creatorId/content",
  isAdminOrCreator,
  creatorController.getContents
);

// add content
router.post("/", isCreator, uploadFile, creatorController.addContent);

//get content by content id
router.get("/content/:contentId", creatorController.getContentById);

// add feedback to content
router.post("/content/:contentId", creatorController.addFeedbackToContent);

// delete content by id
router.delete(
  "/content/:contentId",
  isCreator,
  creatorController.deleteContentById
);

// edit content by id
router.patch(
  "/content/:contentId",
  isCreator,
  creatorController.editContentById
);

module.exports = router;
