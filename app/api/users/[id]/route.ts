import User from '@models/user';
import { connectToDatabase } from '@utils/database';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDatabase();
    const user = await User.findById(params.id);

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response('用户获取失败', { status: 500 });
  }
};
