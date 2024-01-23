import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomsSchema = new Schema({
  name: String,
  id: String,
});

export default mongoose.model('Rooms', roomsSchema);