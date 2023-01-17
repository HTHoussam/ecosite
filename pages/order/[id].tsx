import { PayPalButtons } from '@paypal/react-paypal-js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import OrderSummaryItem from '../../components/pages/order/OrderSummaryItem'
import useOrderPayPal from '../../hooks/useOrderPayPal'
import { ProductType } from '../../types/types'

const OrderScreen = () => {
	const router = useRouter()
	const { id } = router.query
	const orderId = id
	const [
		{
			createOrder,
			onApprove,
			onError,
			isPending,
			loading,
			error,
			order,
			loadingPay,
		},
	] = useOrderPayPal()
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
								{!isPaid && (
									<li>
										{isPending ? (
											<div>LOADING ...</div>
										) : (
											<div>
												<PayPalButtons
													className='mt-4 w-100'
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}></PayPalButtons>
											</div>
										)}
										{loadingPay && <div>Loading ...</div>}
									</li>
								)}
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
