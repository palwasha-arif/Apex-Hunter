const mongoose = require("mongoose");

const fieldGuideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    topic: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, maxlength: 20000 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.FieldGuide || mongoose.model("FieldGuide", fieldGuideSchema);
