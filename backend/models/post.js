const mongoose = require('mongoose');

//Creating the database model for a "post"
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

//Need access to this, so export
module.exports = mongoose.model('Post', postSchema);
