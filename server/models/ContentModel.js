const mongoose = require("mongoose");

// feedbacks schema
const feedbackSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// content schema
const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: Object,
      default: {},
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    feedbacks: {
      type: [feedbackSchema],
      default: [],
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const ContentModel = mongoose.model("ContentModel", contentSchema, "contents");

module.exports = ContentModel;
