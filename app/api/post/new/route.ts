import Post from '@models/post';
import { connectToDatabase } from '@utils/database';

export const POST = async (req: Request, res: Response) => {
  const { userId, content, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPost = new Post({
      creator: userId,
      content,
      tag,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (err) {
    return new Response('小闲话创建失败', { status: 500 });
  }
};
