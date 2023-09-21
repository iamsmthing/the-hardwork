import { NextResponse } from "next/server";

export default async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("__my_cookie__", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log(response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 501 });
  }
}
