export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request){

  const session = await getToken({ req : request, secret : process.env.NEXTAUTH_SECRET}) // get the token
  const path = request.nextUrl.pathname;

  if (!session){ // the session does not exist
    if (path !== '/signup' && path !== '/login'){
      const urlRedirect = new URL('/login' , request.url);
      return NextResponse.redirect(urlRedirect);
    }
  }
  
  // the session exist
  if (session){
    if (path === '/login' || path === '/signup'){
      const urlRedirect_ = new URL('/feed' , request.url);
      return NextResponse.redirect(urlRedirect_);
    }else NextResponse.next();
  }
}

export const config = {
  matcher : ['/pages/:path*', '/signup', '/login', '/feed']
}