import type { IronSessionOptions } from 'iron-session'

type User = {
  id: string
  email?: string
  emailVerified?: boolean
}

const expires = Date.now() + 60 * 60 * 24 * 1000

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expires)
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
