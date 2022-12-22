import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useContext } from 'react'
import Layout from '../components/Layout'
import CartTable from '../components/pages/cart/CartTable'
import CartTotal from '../components/pages/cart/CartTotal'
import { Store } from '../utils/store'

const CartPage = () => {
	const { state } = useContext(Store)
	const {
		cart: { cartItems },
	} = state
	return (
		<Layout title='Shopping Cart'>
			<>
				<h1 className='mb-4 text-xl '>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<div>
						Cart is empty. <Link href={'/'}>Go shopping</Link>
					</div>
				) : (
					<div className='grid md:grid-cols-4 md:gap-5'>
						<div className='overflow-x-auto md:col-span-3'>
							<CartTable cartItems={cartItems} />
						</div>
						<CartTotal cartItems={cartItems} />
					</div>
				)}
			</>
		</Layout>
	)
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false })
