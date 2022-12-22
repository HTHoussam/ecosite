import Link from 'next/link'
import { useContext } from 'react'
import { Product } from '../types/types'
import { titleToSlug } from '../utils/helpers'
import { Store } from '../utils/store'

const ProductItem = ({ product }: { product: Product }) => {
	const { state, dispatch } = useContext(Store)
	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find(
			(x: Product) => x.id === product.id
		)
		const quantity = existItem ? existItem.quantity + 1 : 1
		if (product.stock < quantity) {
			return alert('out of stock, Sorry!')
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
		// router.push('/cart')
	}
	return (
		<div className='card'>
			<Link href={`/product/${product.id}`}>
				<img
					src={product.images[0]}
					alt={product.title}
					className='w-full h-2/3 rounded shadow'
				/>
			</Link>
			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`/product/${titleToSlug(product.title)}`}>
					<h2></h2>
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
