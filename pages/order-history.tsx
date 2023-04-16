import axios from 'axios'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import Layout from '../components/Layout'
import { OrderType } from '../types/types'
import { getError } from '../utils/helpers'
type Action =
	| { type: 'FETCH_REQUEST' }
	| { type: 'FETCH_SUCCESS'; payload: Array<OrderType> }
	| { type: 'FETCH_FAIL'; payload: string }
type State = {
	loading: Boolean
	error: string
	orders: Array<OrderType>
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' }
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, orders: action.payload, error: '' }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}
const OrderHistoryPage = () => {
	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
		orders: [],
	})
	useEffect(() => {
		const fetchOderHistory = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' })
				const { data } = await axios.get<Array<OrderType>>(
					'/api/orders/history'
				)
				if (data && data.length > 0)
					dispatch({ type: 'FETCH_SUCCESS', payload: data })
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
			}
		}
		fetchOderHistory()
	}, [])
	return (
		<Layout title='Orders History'>
			<>
				<h1>Order History</h1>
				{loading ? (
					<div>Loading ...</div>
				) : error ? (
					<div>error</div>
				) : (
					<div className='overflow-x-auto'>
						<table className='min-w-full'>
							<thead className='border-b'>
								<tr>
									<th className='px-5 text-left'>ID</th>
									<th className='p-5 text-left'>DATE</th>
									<th className='p-5 text-left'>TOTAL</th>
									<th className='p-5 text-left'>PAID</th>
									<th className='p-5 text-left'>DELIVERED</th>
									<th className='px-5 text-left'>ACTION</th>
								</tr>
							</thead>
							<tbody>
								{orders.length === 0 ? (
									<>
										No orders yet go <Link href='/'>Shopping</Link>
									</>
								) : (
									orders.map((order) => (
										<tr key={order._id} className='border-b'>
											<td className='p-5'>{order._id.substring(20, 24)}</td>
											<td className='p-5'>
												{order.createdAt.substring(0, 10)}
											</td>
											<td className='p-5'>{order.totalPrice}</td>
											<td className='p-5'>
												{order.isPaid
													? `${order.paidAt.substring(0, 10)}`
													: 'notpaid'}
											</td>
											<td className='p-5'>
												{order.isDelivered
													? `${order.deliveredAt.substring(0, 10)}`
													: 'not delivered'}
											</td>
											<td className='p-5'>
												<Link href={`/order/${order._id}`}>Details</Link>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				)}
			</>
		</Layout>
	)
}
OrderHistoryPage.auth = true
export default OrderHistoryPage
