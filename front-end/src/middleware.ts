import { User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };

export const addTokenMiddleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  const user = token?.user as User;
  const accessToken = user?.token;
  const requestHeaders = new Headers(req.headers);
  if (accessToken) {
    requestHeaders.set("Authorization", accessToken);
  }
  console.log("fawfwaefwef");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
