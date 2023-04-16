import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Order from '../../../models/Order'
import db from '../../../utils/db'
import { getError } from '../../../utils/helpers'

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).send('signin required ')
	}
	const { user } = session
	try {
		await db.connect()
		const newOrder = new Order({
			...req.body,
			user: user ? user.id : -1,
			isDelivered: false,
			isPaid: false,
		})
		const order = await newOrder.save()
		res.status(200).send(order)
	} catch (error) {
		res.status(502).send({ error: true, message: getError(error) })
	}
}
export default handler
