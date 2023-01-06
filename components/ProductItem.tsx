/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { ProductType } from '../types/types'
import { Store } from '../utils/store'

const ProductItem = ({ product }: { product: ProductType }) => {
	const { state, dispatch } = useContext(Store)
	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find(
			(x: ProductType) => x._id === product._id
		)
		const quantity = existItem ? existItem.quantity + 1 : 1
		if (product.countInStock < quantity) {
			return toast.warning('out of stock, Sorry!', { toastId: 'outOfStock' })
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
		toast.success('Product added successfully', { toastId: 'successAlert' })
	}
	return (
		<div className='card'>
			<Link href={`/product/${product.slug}`}>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-2/3 rounded shadow'
				/>
			</Link>
			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`/product/${product.slug}`}>
					<h2>{product.name}</h2>
				</Link>
				<p className='mb-2'>{product.brand}</p>
				<p>${product.price}</p>
				<button
					className='primary-button'
					onClick={addToCartHandler}
					type='button'>
					Add to cart
				</button>
			</div>
		</div>
	)
}
export default ProductItem
