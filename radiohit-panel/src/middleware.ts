import { COOKIES } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    const isLoggedIn =
        request.cookies.get(COOKIES.SESSION_ID) &&
        request.cookies.get(COOKIES.USER_ID);

    if (!isLoggedIn) {
        if (request.nextUrl.pathname.startsWith("/") && request.nextUrl.pathname.length > 1) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    } else {
        if (request.nextUrl.pathname.startsWith("/") && request.nextUrl.pathname.length == 1) {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
