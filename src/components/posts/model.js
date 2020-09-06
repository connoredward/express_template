import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  category: { type: String, required: true },
  slug:     { type: String, slug: "title", slug_padding_size: 1, unique: true },
  img:      { type: String },
  video:    { type: String },
  row:      { type: Number },
  column:   { type: Number }
}, {
  timestamps: true
});

const PostModel = mongoose.model("PostModel", postSchema);

export default PostModel;