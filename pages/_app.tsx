import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { StoreProvider } from '../utils/store'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</SessionProvider>
	)
}
