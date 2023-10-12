import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import { connect } from 'http2';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();

    await User.create({ username: name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error registering user.' },
      { status: 500 }
    );
  }
}
