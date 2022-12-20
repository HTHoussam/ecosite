import Link from 'next/link'
import { Product } from '../pages/types/types'
import { titleToSlug } from '../utils/helpers'

const ProductItem = ({ product }: { product: Product }) => {
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
				<button className='primary-button' type='button'>
					Add to cart
				</button>
			</div>
		</div>
	)
}
export default ProductItem
