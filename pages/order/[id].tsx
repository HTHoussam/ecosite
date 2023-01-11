import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import OrderSummaryItem from '../../components/pages/order/OrderSummaryItem'
import { OrderType, ProductType } from '../../types/types'
import { getError } from '../../utils/helpers'

const reducer = (
	state: any,
	action: { type: string; payload?: OrderType | AxiosError }
) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' }
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
const OrderScreen = () => {
	const { query } = useRouter()
	const orderId = query.id
	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
	})
	useEffect(() => {
		if (!orderId) {
			return
		}
		const fetchOrder = async () => {
			try {
				dispatch({
					type: 'FETCH_REQUEST',
				})
				const { data } = await axios.get<OrderType>(`/api/orders/${orderId}`)
				dispatch({ type: 'FETCH_SUCCESS', payload: data })
			} catch (error: any) {
				console.log('ERROr on fetch', error)
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
			}
		}
		fetchOrder()
	}, [orderId])
	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order
	const orderSummaryItems = {
		price: itemsPrice,
		shipping: shippingPrice,
		tax: taxPrice,
		totalPrice: totalPrice,
	}
	return (
		<Layout title={`Order N: ${orderId}`}>
			<>
				<h1 className='mb-4 text-xl'>{`Order ${orderId}`}</h1>
				{loading ? (
					<div>loading...</div>
				) : error ? (
					<div className='alert-error'>{error}</div>
				) : (
					<div className='grid md:grid-cols-4 md:gap-5'>
						<div className='overflow-x-auto md:col-span-3'>
							<div className='card p-5'>
								<h2 className='mb-2 text-lg'>Shipping Address</h2>
								<div>
									{shippingAddress.fullName},{shippingAddress.address}
									{shippingAddress.city},{shippingAddress.postalCode}
									{shippingAddress.country}
								</div>
								{isDelivered ? (
									<div className='alert-success'>
										delivered at {deliveredAt}
									</div>
								) : (
									<div className='alert-error'>not delivered yet</div>
								)}
							</div>
							<div className='card p-5'>
								<h2 className='mb-2 text-lg'>Payment method</h2>
								<div>{paymentMethod}</div>
								{isPaid ? (
									<div className='alert-success'>Paid at {paidAt}</div>
								) : (
									<div className='alert-error'>Not paid yet</div>
								)}
							</div>
							<div className='card overflow-x-auto p-5'>
								<h2 className='mb-2 text-lg'>Order Items</h2>
								<table className='min-w-full'>
									<thead className='border-b'>
										<tr>
											<th className='px-5 text-left'>item</th>
											<th className='px-5 text-center'>Quantity</th>
											<th className='px-5 text-center'>Price</th>
											<th className='px-5 text-center'>Subtotal</th>
										</tr>
									</thead>
									<tbody>
										{orderItems.map((item: ProductType) => (
											<tr key={item._id} className='border-b'>
												<td className='p-4'>
													<Link href={`/product/${item.slug}`}>
														<Image
															src={item.image}
															alt={item.name}
															width={50}
															height={50}></Image>
														{item.name}
													</Link>
												</td>
												<td className='px-5 text-center'>{item.quantity}</td>
												<td className='px-5 text-center'>$ {item.price}</td>
												<td className='px-5 text-center'>
													{item.quantity * item.price}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<div className='card p-7'>
								<h2 className='mb-2 text-lg'>Order Summary</h2>
								{Object.entries(orderSummaryItems).map(([key, value]) => {
									return (
										<OrderSummaryItem key={key} label={key} value={value} />
									)
								})}
							</div>
						</div>
					</div>
				)}
			</>
		</Layout>
	)
}
OrderScreen.auth = true
export default OrderScreen
