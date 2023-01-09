import Image from 'next/image'
import Link from 'next/link'
import { ProductType } from '../../../types/types'

const OrderTable = ({ cartItems }: { cartItems: ProductType[] }) => {
	return (
		<table className='min-w-full'>
			<thead className='border-b'>
				<tr>
					<th className='px-5 text-left'>Item</th>
					<th className='px-5 text-left'>Quantity</th>
					<th className='px-5 text-left'>Price</th>
					<th className='px-5 text-left'>Subtotal</th>
				</tr>
			</thead>
			<tbody>
				{cartItems.map((item: ProductType) => (
					<tr key={item._id} className='border-b'>
						<td>
							<Link href={`/product/${item.slug}`}>
								<Image
									src={item.image}
									alt={item.name}
									width={50}
									height={50}></Image>
								{item.name}
							</Link>
						</td>
						<td className='p-5 text-right'>{item.quantity}</td>
						<td className='p-5 text-right'>$ {item.price}</td>
						<td className='p-5 text-right'>{item.quantity * item.price}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default OrderTable
