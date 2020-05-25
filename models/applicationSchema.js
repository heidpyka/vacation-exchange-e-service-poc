const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for application documents in MongoDB

const ApplicationSchema = new Schema({
  username: {
    type: String,
    required: [true, "The username field is required"],
  },
  name: {
    type: String,
    required: [true, "Kontrollera angivet namn"],
  },
  pid: {
    type: Number,
    required: [true, "Kontrollera angivet personnummer."],
  },
  year: {
    type: Number,
    required: [true, "The year field is required"],
  },
  status: {
    type: String,
    required: [true, "The status field is required"],
  },
  manager: {
    type: String,
    required: [true, "The manager field is required"],
  },
});

const Application = mongoose.model("application", ApplicationSchema);

module.exports = Application;
