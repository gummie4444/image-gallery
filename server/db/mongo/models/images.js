/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const ImagesSchema = new mongoose.Schema({
  name: String,
  question: String,
  answer: String,
  imageURL: String,
  thumbnailURL: String,
  id: String
});


ImagesSchema.plugin(timestamps);

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Images', ImagesSchema);
