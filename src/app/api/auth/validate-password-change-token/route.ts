import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const payload = verify(token, process.env.JWT_SECRET as string);
    if (payload) {
      return NextResponse.json(
        { ok: true, userId: payload.sub },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
