import { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const user = token?.user as User;
  //   console.log("🚀 ~ GET ~ token:", user?.token as string);

  return NextResponse.json({ error: "Internal Server Error" });
}
