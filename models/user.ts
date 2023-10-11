import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, '邮箱已被注册。'],
    required: [true, '邮箱是必填项。'],
  },
  username: {
    type: String,
    required: [true, '用户名是必填项。'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      '用户名无效，它必须是 8-20 个字符，只能包含字母、数字、下划线和点，并且需要是唯一的。',
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
