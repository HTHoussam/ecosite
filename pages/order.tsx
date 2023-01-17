import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import OrderComp from '../components/pages/order/OrderComp'
import CheckoutWizard from '../components/pages/shipping/CheckoutWizard'
import { OrderType, ProductType } from '../types/types'
import { getError } from '../utils/helpers'
import { Store } from '../utils/store'

const PlaceOrderPage = () => {
	const router = useRouter()
	const { state, dispatch } = useContext(Store)
	const { cart } = state
	const { cartItems, shippingAddress, paymentMethod } = cart
	const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
	const itemsPrice = round2(
		cartItems.reduce((p: number, c: ProductType) => p + c.quantity * c.price, 0)
	)
	const shippingPrice = itemsPrice > 200 ? 0 : 15
	const taxPrice = round2(itemsPrice * 0.15)
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
	const orderSummaryItems = {
		price: itemsPrice,
		shipping: shippingPrice,
		tax: taxPrice,
		total: totalPrice,
	}

	useEffect(() => {
		if (!paymentMethod) {
			router.push('/payment')
		}
	}, [paymentMethod, router])
	const [loading, setLoading] = useState(false)
	const placeOrderHandler = async () => {
		try {
			setLoading(true)
			const { data } = await axios.post<OrderType>('api/orders/', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				shippingPrice,
				taxPrice,
				totalPrice,
				itemsPrice,
			})
			if (!data) {
				toast.error(
					<div>
						Order failed go back to previous step
						<Link href={'/payment'}> here</Link>
					</div>
				)
			}
			setLoading(false)
			dispatch({ type: 'CART_CLEAR_ITEMS' })
			Cookies.set(
				'cart',
				JSON.stringify({
					...cart,
					cartItems: [],
				})
			)
			router.push(`order/${data._id}`)
		} catch (error) {
			setLoading(false)
			toast.error(getError(error))
		}
	}
	return (
		<Layout title='Place Order'>
			<>
				<CheckoutWizard activeStep={3} />
				<h1 className='mb-4 text-xl'>Place Order</h1>
				{cartItems.length === 0 ? (
					<div>
						No items{' '}
						<Link href='/' className='capitalize'>
							back to shopping
						</Link>
					</div>
				) : (
					<OrderComp
						cartItems={cartItems}
						shippingAddress={shippingAddress}
						orderSummaryItems={orderSummaryItems}
						paymentMethod={paymentMethod}
						placeOrderHandler={placeOrderHandler}
						loading={loading}
					/>
				)}
			</>
		</Layout>
	)
}

PlaceOrderPage.auth = true

export default PlaceOrderPage
