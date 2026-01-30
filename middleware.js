import { NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export default async function middleware(req) {
  const url = req.nextUrl.clone();
  
  // الرابط المحجوب
  const targetHost = 'genz002.net';
  url.hostname = targetHost;
  url.protocol = 'https';
  url.port = '';

  const requestHeaders = new Headers(req.headers);
  
  // هذه الأسطر هي الأهم لحل مشكلة "Not accessible"
  requestHeaders.set('host', targetHost);
  requestHeaders.set('origin', `https://${targetHost}`);
  requestHeaders.set('referer', `https://${targetHost}/`);
  
  // محاولة إرسال IP المستخدم (لحل مشكلة التصويت)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    requestHeaders.set('X-Forwarded-For', forwardedFor);
  }

 {
    request: {
      headers: requestHeaders,
    },
  });
}
