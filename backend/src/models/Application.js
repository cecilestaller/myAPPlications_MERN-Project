import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    expectedSalary: { type: Number },
    rating: { type: Number, min: 0, max: 5, required: true },
    contactPerson: { type: String },
    applicationType: {
      type: String,
      enum: [
        "LinkedIn",
        "Firmenportal",
        "indeed",
        "stepstone",
        "Xing",
        "E-Mail",
        "Sonstige",
      ],
      required: true,
    },
    city: { type: String, required: true },
    workLocation: {
      type: String,
      required: true,
      enum: ["Hybrid", "Remote", "Vor Ort"],
    },
    applicationFileName: { type: [String] },
    comment: { type: String },
    active: { type: Boolean, default: true },
    invited: { type: Boolean, default: false },
    interviewDate: { type: Date },
    interviewComment: { type: String },
    status: {
      type: String,
      enum: [
        "beworben - Rückmeldung offen",
        "eingeladen zum Interview",
        "Firmenfeedback offen",
        "Mein Feedback offen",
        "Absage erhalten",
        "Absage erteilt",
      ],
      default: "beworben - Rückmeldung offen",
    },
    // userId: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  {
    collection: "applications",
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
