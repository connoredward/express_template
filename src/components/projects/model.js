import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, slug: "title", slug_padding_size: 1, unique: true }
}, {
  timestamps: true
});

const ProjectModel = mongoose.model("ProjectModel", projectSchema);

export default ProjectModel;