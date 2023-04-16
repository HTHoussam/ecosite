import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../../../utils/store'
import UserMenu, { MenuItem } from '../../core/UserMenu'

const NavBar = () => {
	const { state, dispatch } = useContext(Store)
	const { status, data: session } = useSession()
	const { cart } = state
	const [cartItemsCount, setCartItemsCount] = useState(0)
	useEffect(() => {
		setCartItemsCount(
			cart.cartItems.reduce((a: any, c: { quantity: any }) => a + c.quantity, 0)
		)
	}, [cart.cartItems])

	const userMenuItems: MenuItem[] = [
		{
			label: 'profile',
			href: '/profile',
			className: 'dropdown-link',
		},
		{
			label: 'order history',
			href: '/order-history',
			className: 'dropdown-link',
		},
		{
			label: 'signout',
			href: '',
			className: 'dropdown-link',
			callbackFn: () => {
				Cookies.remove('cart')
				dispatch({ type: 'CART_RESET' })
				signOut({ callbackUrl: '/login' })
			},
		},
	]
	return (
		<nav className='flex h-12 items-center px-4 justify-between shadow-md'>
			<Link href={'/'} className='text-lg font-bold'>
				EcomSite
			</Link>
			<div>
				<button className='mr-2 p-2 rounded-md transition border-b-2  ease-in-out duration-300 hover:border-b-blue-600  '>
					<Link href={'/cart'} className='p-2'>
						Cart
						{cartItemsCount > 0 && (
							<span className='ml-1 rounded-full bg-red-600 px-2 oy-1 text-xs font-bold text-white'>
								{cartItemsCount}
							</span>
						)}
					</Link>
				</button>
				{status === 'loading' ? (
					'Loading'
				) : session?.user ? (
					<UserMenu buttonLabel={session.user.name} menuItems={userMenuItems} />
				) : (
					<Link href={'/login'}>Login</Link>
				)}
			</div>
		</nav>
	)
}
export default NavBar
