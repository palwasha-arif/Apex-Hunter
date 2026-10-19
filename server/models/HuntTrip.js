const mongoose = require("mongoose");

const huntTripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    location: { type: String, default: "", trim: true, maxlength: 160 },
    startDate: { type: Date },
    endDate: { type: Date },
    notes: { type: String, default: "", maxlength: 4000 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.HuntTrip || mongoose.model("HuntTrip", huntTripSchema);
