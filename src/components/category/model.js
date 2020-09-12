import mongoose, { mongo } from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, slug: "title", slug_padding_size: 1, unique: true },
  status: { type: String },
  color: { type: String }
}, {
  timestamps: true
});

const CategoryModel = mongoose.model('CategoryModel', categorySchema);

export default CategoryModel;