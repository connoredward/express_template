import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const contentSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  post:      { type: String },
  slug:      { type: String, slug: "title", slug_padding_size: 1, unique: true },
  img:       { type: String },
  row:       { type: Number },
  column:    { type: Number },
  status:    { type: String }
}, {
  timestamps: true
});

const ContentModel = mongoose.model('ContentModel', contentSchema);

export default ContentModel;