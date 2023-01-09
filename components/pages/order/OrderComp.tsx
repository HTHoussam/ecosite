import Link from 'next/link'
import { ProductType } from '../../../types/types'
import OrderSummaryItem from './OrderSummaryItem'
import OrderTable from './OrderTable'
import ShippingDetails from './ShippingDetails'

const OrderComp = ({
	cartItems,
	shippingAddress,
	orderSummaryItems,
	paymentMethod,
	placeOrderHandler,
	loading,
}: {
	cartItems: ProductType[]
	shippingAddress: {
		fullName: string
		address: string
		city: string
		postalCode: string
		country: string
	}
	orderSummaryItems: {
		price: number
		shipping: number
		tax: number
		total: number
	}
	paymentMethod: string
	placeOrderHandler: () => {}
	loading: boolean
}) => {
	return (
		<div className='grid md:grid-cols-4 md:gap-5'>
			<div className='overflow-x-auto md:col-span-3'>
				<ShippingDetails shippingAddress={shippingAddress} />
				<div className='card p-5 '>
					<h2 className='mb-2 text-lg'>Payment Method</h2>
					<div>{paymentMethod}</div>
					<div>
						<Link href={'/payment'}>Edit</Link>
					</div>
				</div>
				<div className='card overflow-x-auto p-5'>
					<h2 className='mb-2 text-lg'>Order Items</h2>
					<OrderTable cartItems={cartItems} />
					<div>
						<Link href={'/cart'}>Edit</Link>
					</div>
				</div>
			</div>
			<div>
				<div className='card p-5'>
					<h2 className='mb-2 text-lg'>Order Summary</h2>
					<ul>
						{/* <OrderSummaryItem label={'Items'} value={itemsPrice} /> */}
						{Object.entries(orderSummaryItems).map(([key, value]) => {
							return <OrderSummaryItem key={key} label={key} value={value} />
						})}
						<li>
							<button
								disabled={loading}
								onClick={placeOrderHandler}
								className='primary-button w-full'>
								{loading ? 'Loading...' : 'Place Order'}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default OrderComp
