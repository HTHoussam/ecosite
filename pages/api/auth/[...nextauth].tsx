import bcryptjs from 'bcrypt'
import { JWT, Session } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/User'
import db from '../../../utils/db'

export default NextAuth({
	secret: process.env.NEXT_AUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user && user.id) token.id = user.id
			if (user && user.isAdmin) token.isAdmin = user.isAdmin
			return token
		},
		// @ts-ignore
		async session({ session, token }: { session: Session; token: JWT }) {
			if (!session || !session.user) {
				return
			}
			if (token?.id) session.user.id = token.id
			if (token.isAdmin) session.user.isAdmin = token.isAdmin
			if (!session) return
			return session
		},
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials || !credentials.email || !credentials.password) {
					return null
				}
				await db.connect()
				const user = await User.findOne({
					email: credentials.email,
				})
				await db.disconnect()
				if (!user) throw new Error('No user')
				if (bcryptjs.compareSync(credentials.password, user.password)) {
					return {
						id: user.id,
						name: user.name,
						email: user.email,
						image: 'f',
						isAdmin: user.isAdmin,
					}
				}
				throw new Error('Invalid email or password')
			},
		}),
	],
})
