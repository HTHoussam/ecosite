import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { NextComponentType } from 'next'
import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import { StoreProvider } from '../utils/store'

type CustomAppProps = AppProps & {
	Component: NextComponentType & { auth?: boolean } // add auth type
}
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: CustomAppProps) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				<PayPalScriptProvider
					deferLoading={true}
					options={{ 'client-id': 'sb' }}>
					{Component.auth ? (
						<Auth>
							<Component {...pageProps} />
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</PayPalScriptProvider>
			</StoreProvider>
		</SessionProvider>
	)
}

function Auth({ children }: { children: JSX.Element }) {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/unauthorized?message=login required')
		},
	})
	if (status === 'loading') {
		return <div>Loading...</div>
	}
	return children
}
