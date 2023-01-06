import { XCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { ProductType } from '../../../types/types'
import { Store } from '../../../utils/store'

const CartTable = ({ cartItems }: { cartItems: ProductType[] }) => {
	const { dispatch } = useContext(Store)

	const removeItemHandler = (item: ProductType) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
		toast.warning('Product removed from cart', { toastId: 'removeFromCart' })
	}
	const updateCartHandler = async (item: ProductType, qty: string) => {
		const quantity = Number.parseInt(qty)
		const { data } = await axios.get<ProductType>(`/api/products/${item._id}`)
		if (data.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock', {
				toastId: 'updateCart',
			})
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
		toast.success('Product added to the cart', { toastId: 'addToCart' })
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
				{cartItems.map((item: ProductType) => (
					<tr key={item._id} className='border-b'>
						<td>
							<Link href={`/product/${item._id}`}>
								<Image
									src={item.image}
									alt={item.name}
									width={50}
									height={50}></Image>
								&nbsp;
								{item.name}
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
								{[...Array(item.countInStock).keys()].map((x) => (
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
