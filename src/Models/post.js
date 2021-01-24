// Native modules imports
import mongoose from 'mongoose';

// Constants declaration
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    author: ObjectId,
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    // date: Date
});

export default mongoose.model('Post', postSchema);