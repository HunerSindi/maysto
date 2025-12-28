import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Check for the token in cookies
    const token = request.cookies.get('token')?.value;

    // 2. Define the path user is trying to visit
    // We use nextUrl because it provides helpful methods
    const { pathname } = request.nextUrl;

    // 3. Logic: If user is on Login page but HAS token -> Go to Dashboard
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 4. Logic: If user is NOT on Login page and HAS NO token -> Go to Login
    // We exclude public paths like images or api routes just in case
    if (pathname !== '/login' && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 5. Allow access
    return NextResponse.next();
}

// Config: Match all paths except static files, images, etc.
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};