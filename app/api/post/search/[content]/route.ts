import Post from '@models/post';
import User from '@models/user';
import { connectToDatabase } from '@utils/database';

type Params = {
  params: {
    content: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();

    let posts: any = [];

    const user = await User.findOne({
      username: { $regex: params.content, $options: 'i' },
    });

    if (!user)
      posts = await Post.find({
        $or: [
          { tag: { $regex: params.content } },
          { content: { $regex: params.content, $options: 'u' } },
          // { creator: user.id },
        ],
      })
        .populate('creator')
        .sort({ createdAt: -1 });

    if (user) {
      posts = await Post.find({ creator: user.id })
        .populate('creator')
        .sort({ createdAt: -1 });
    }

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response('小闲话获取失败', { status: 500 });
  }
};
