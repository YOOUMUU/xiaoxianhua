import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);

    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
