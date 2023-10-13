import Post from '@models/post';
import { connectToDatabase } from '@utils/database';

type Params = {
  params: {
    tag: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();
    const posts = await Post.find({ tag: params.tag })
      .populate('creator')
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response('小闲话获取失败', { status: 500 });
  }
};
