import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import CartTable from '../components/pages/cart/CartTable'
import CartTotal from '../components/pages/cart/CartTotal'

const CartPage = () => {
	const { state, dispatch } = useContext(Store)
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
							{/* <table className='min-w-full'>
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
													onChange={(e) =>
														updateCartHandler(item, e.target.value)
													}>
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
												<button
													type='button'
													onClick={() => removeItemHandler(item)}>
													<XCircleIcon height={25} width={25}></XCircleIcon>
												</button>
											</td>
											<td></td>
										</tr>
									))}
								</tbody>
							</table> */}
							<CartTable cartItems={cartItems} />
							{/* here table */}
						</div>
						<CartTotal cartItems={cartItems} />
					</div>
				)}
			</>
		</Layout>
	)
}

export default CartPage
