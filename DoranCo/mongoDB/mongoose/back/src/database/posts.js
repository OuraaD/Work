import mongoose from "mongoose";

// * Define a scheme:
const PostsSchema = mongoose.Schema({
  Title: { type: String, required: true, unique: true },
  Description: { type: String, required: true },
});

// * Export the model to be used elsewhere:
// the first parameter is the name of the collection
export const PostsModel = mongoose.model("posts", PostSchema);
