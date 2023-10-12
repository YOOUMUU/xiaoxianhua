import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: String,
    unique: [true, 'id已被注册。'],
    required: [true, 'id是必填项。'],
  },
  username: {
    type: String,
    required: [true, '用户名是必填项。'],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
