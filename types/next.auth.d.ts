/* eslint-disable no-unused-vars */
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface User {
		id: string
		name?: string | null
		email?: string | null
		image?: string | null
		isAdmin?: boolean
	}
	interface Session {
		user?: {
			id: string
			/** The user's name. */
			name: string
			email: string
			isAdmin: boolean
		} & DefaultSession['user']
	}
	interface JWT {
		name?: string | null
		email?: string | null
		picture?: string | null
		sub?: string
		id: string
		isAdmin: boolean
	}
}
