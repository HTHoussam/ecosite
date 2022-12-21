import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store'

const Layout = ({
	title,
	children,
}: {
	title?: string
	children: JSX.Element
}) => {
	const { state, dispatch } = useContext(Store)
	const { cart } = state
	const [cartItemsCount, setCartItemsCount] = useState(0)
	useEffect(() => {
		setCartItemsCount(
			cart.cartItems.reduce((a: any, c: { quantity: any }) => a + c.quantity, 0)
		)
	}, [cart.cartItems])
	return (
		<>
			<Head>
				<title>{title ? title : 'ecomsite'}</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex min-h-screen flex-col justify-between'>
				<header>
					<nav className='flex h-12 items-center px-4 justify-between shadow-md'>
						<Link href={'/'} className='text-lg font-bold'>
							EcomSite
						</Link>
						<div>
							<Link href={'/cart'} className='p-2'>
								Cart
								{cartItemsCount > 0 && (
									<span className='ml-1 rounded-full bg-red-600 px-2 oy-1 text-xs font-bold text-white'>
										{cartItemsCount}
									</span>
								)}
							</Link>
							<Link href={'/login'} className='p-2'>
								Login
							</Link>
						</div>
					</nav>
				</header>
				<main className='container m-auto mt-4 px-4'>{children}</main>
				<footer className='flex h-10 justify-center items-center'>
					&copy; Copyright 2022,EcomSite
				</footer>
			</div>
		</>
	)
}
export default Layout
