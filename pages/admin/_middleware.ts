import { NextRequest, NextResponse } from 'next/server'
import {
  AUTH_ROUTES_OPEN,
  ADMIN_BASE_PATH,
  ADMIN_LOGIN_PATH
} from '@/src/configs/appConfig'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const ironSession = req.cookies[process.env.COOKIE_NAME || '']

  if (ironSession === undefined && !AUTH_ROUTES_OPEN.includes(url.pathname)) {
    url.pathname = ADMIN_LOGIN_PATH
    return NextResponse.redirect(url)
  }

  if (ironSession !== undefined && AUTH_ROUTES_OPEN.includes(url.pathname)) {
    url.pathname = ADMIN_BASE_PATH
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
