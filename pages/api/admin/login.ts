import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/src/configs/sessionOptionsConfig'
import { auth, singIn } from '@/src/services/firebaseService'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    return res
      .status(400)
      .json({ status: 400, message: `Method Not Allowed: ${req.method} ` })
  }

  const { email, password } = req.body

  try {
    const userCredential = await singIn(auth, email, password)
    const user = {
      id: userCredential.user.uid,
      email: userCredential.user.email || undefined,
      emailVerified: userCredential.user.emailVerified
    }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(400).json({ status: 400, message: (error as Error).message })
  }
}
