import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const subscribeSchema = new mongoose.Schema({
  title: { type: String },
  slug:  { type: String, slug: "title", slug_padding_size: 1, unique: true },
  type: { 
    title: { type: String },
    _id: { type: String }
  },  
  status: { type: String },
  owner: { type: String }
}, {
  timestamps: true
});

const SubscribeModel = mongoose.model('SubscribeModel', subscribeSchema);

export default SubscribeModel;
