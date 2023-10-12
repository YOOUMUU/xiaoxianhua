import { connectToDatabase } from '@utils/database';
import User from '@models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, email } = await req.json();
    const user =
      (await User.findOne({ username: name }).select('_id')) ||
      (await User.findOne({ email }).select('_id'));

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
