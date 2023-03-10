import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Order from '../../../../models/Order'
import db from '../../../../utils/db'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const session = await getSession({ req })
	if (!session) {
		return res.status(402).send('Signin required')
	}
	await db.connect()
	const order = await Order.findById(req.query.id)
	await db.disconnect()
	return res.send(order)
}
export default handler
