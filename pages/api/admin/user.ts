import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/src/configs/sessionOptionsConfig'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    res.json({ ...req.session.user })
  } else {
    res.json({ status: 404, message: 'User Not Found' })
  }
}
