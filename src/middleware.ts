import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminPaths = [
  "/bang-dieu-khien/quan-ly-binh-luan",
  "/bang-dieu-khien/quan-ly-thong-bao",
  "/bang-dieu-khien/quan-ly-nguoi-dung",
];

const protectedPaths = [
  "/user/profile",
  "/user/history",
  "/user/favorite",
  "/user/playlist",
];

export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });

  // Nếu không có token và yêu cầu truy cập vào trang bảo vệ
  if (!token && protectedPaths.includes(pathname)) {
    console.log("Không có token và yêu cầu truy cập vào trang bảo vệ");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu có token và đang truy cập vào adminPaths, kiểm tra quyền truy cập
  if (token && adminPaths.includes(pathname)) {
    if (token.role === "admin") {
      return NextResponse.next();
    } else if (token.role === "member") {
      return NextResponse.json(
        { status: "error", message: "Bạn không có quyền truy cập!" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bang-dieu-khien/:path*", "/user/:path*"],
};
