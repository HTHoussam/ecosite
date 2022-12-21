import router from 'next/router'
import React from 'react'
import { Product } from '../../../pages/types/types'

const CartTotal = ({ cartItems }: { cartItems: Product[] }) => {
	return (
		<div className='card p-5'>
			<ul>
				<li>
					<div className='pb-3'>
						Subtotal (
						{cartItems.reduce((a: any, c: Product) => a + c.quantity, 0)}
						): $
						{cartItems.reduce(
							(a: any, c: Product) => a + c.quantity * c.price,
							0
						)}
					</div>
				</li>
				<li>
					<button
						className='primary-button w-full'
						onClick={() => router.push('/shipping')}>
						Check Out
					</button>
				</li>
			</ul>
		</div>
	)
}

export default CartTotal
