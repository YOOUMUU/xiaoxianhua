import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, '内容是必填项。'],
  },
  tag: {
    type: String,
    required: [true, '标签是必填项。'],
  },
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
