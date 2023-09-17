const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/notes-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Add this option for Mongoose v6 and above
});