import Post from '@models/post';
import { connectToDatabase } from '@utils/database';

type Params = {
  params: {
    id: string;
  };
};

// GET read
export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();
    const post = await Post.findById(params.id).populate('creator');

    if (!post) {
      return new Response('小闲话获取失败', { status: 404 });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new Response('小闲话获取失败', { status: 500 });
  }
};

// PATCH update
export const PATCH = async (req: Request, { params }: Params) => {
  const { content, tag } = await req.json();

  try {
    await connectToDatabase();

    const existingPost = await Post.findById(params.id);

    if (!existingPost) {
      return new Response('小闲话获取失败', { status: 404 });
    }

    existingPost.content = content;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('小闲话更新失败', { status: 500 });
  }
};

// DELETE delete
export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();

    await Post.findByIdAndRemove(params.id);

    return new Response('小闲话已删除', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('小闲话删除失败', { status: 500 });
  }
};
