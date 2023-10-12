import Post from '@models/post';
import { connectToDatabase } from '@utils/database';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();
    const posts = await Post.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response('小闲话获取失败', { status: 500 });
  }
};
