import { XCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { Product } from '../../../types/types'
import { Store } from '../../../utils/store'

const CartTable = ({ cartItems }: { cartItems: Product[] }) => {
	const { dispatch } = useContext(Store)
	const removeItemHandler = (item: Product) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
	}
	const updateCartHandler = (item: Product, qty: string) => {
		const quantity = Number.parseInt(qty)
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
	}
	return (
		<table className='min-w-full'>
			<thead className='border-b'>
				<tr>
					<th className='px-5 text-left'>Item</th>
					<th className='p-5 text-right'>Quantity</th>
					<th className='p-5 text-right'>Price</th>
					<th className='p-5'>Action</th>
				</tr>
			</thead>
			<tbody>
				{cartItems.map((item: Product) => (
					<tr key={item.id} className='border-b'>
						<td>
							<Link href={`/product/${item.id}`}>
								<Image
									src={item.images[0]}
									alt={item.title}
									width={50}
									height={50}></Image>
								&nbsp;
								{item.title}
							</Link>
						</td>
						<td className='p-5 text-right'>
							<select
								className='bg-white w-12'
								name='quantity'
								id='quantity'
								value={item.quantity}
								onChange={(e) => updateCartHandler(item, e.target.value)}>
								{' '}
								{[...Array(item.stock).keys()].map((x) => (
									<option key={x + 1} value={x + 1}>
										{x + 1}
									</option>
								))}
							</select>
						</td>
						<td className='p-5 text-right'>${item.price}</td>
						<td className='p-5 text-center'>
							<button type='button' onClick={() => removeItemHandler(item)}>
								<XCircleIcon height={25} width={25}></XCircleIcon>
							</button>
						</td>
						<td></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default CartTable
