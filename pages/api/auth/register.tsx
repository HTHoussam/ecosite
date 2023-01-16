import bcryptjs from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import db from '../../../utils/db'
import { getError } from '../../../utils/helpers'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != 'POST') {
		return res.status(402).send({ message: 'error on register' })
	}
	const { name, password, email } = req.body
	if (!name || !password || !email || !email.includes('@')) {
		return res.status(502).send({ message: 'error on register', error: true })
	}
	try {
		await db.connect()
		const userExist = await User.findOne({
			email: email,
		})
		if (userExist) {
			res.status(402).send({
				message: 'User already exist,try to sign in',
			})
			await db.disconnect()
			return
		}
		const newUser = new User({
			name,
			email,
			password: bcryptjs.hashSync(password, 6),
			isAdmin: false,
		})
		newUser.save()
		await db.disconnect()
		res.status(200).send({
			message: 'User created successfully',
			_id: newUser._id,
			name: newUser.name,
			isAdmin: newUser.isAdmin,
			email: newUser.email,
		})
	} catch (error) {
		return res.status(503).send({ message: getError(error), error: true })
	}
}
export default handler
