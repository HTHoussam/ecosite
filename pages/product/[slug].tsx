import axios from 'axios'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import Product from '../../models/Product'
import { ProductType } from '../../types/types'
import db from '../../utils/db'
import { Store } from '../../utils/store'
//

const ProductPage = ({ product }: { product: ProductType }) => {
	const { state, dispatch } = useContext(Store)
	const router = useRouter()
	const addToCartHandler = async () => {
		const existItem = state.cart.cartItems.find(
			(x: ProductType) => x.slug === product.slug
		)
		const quantity = existItem ? existItem.quantity + 1 : 1
		const { data } = await axios.get<ProductType>(
			`/api/products/${product._id}`
		)
		if (data.countInStock < quantity) {
			return toast.error('out of stock, Sorry!', { toastId: 'outOfStockError' })
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
		router.push('/cart')
	}
	if (!product) {
		return (
			<Layout title='Product not found'>
				<div>Product not found</div>
			</Layout>
		)
	}
	return (
		<Layout title={`${product.name}`}>
			<div className='py-2'>
				<Link href='/'>back to products</Link>

				<div className='grid md:grid-cols-4 md:gap-3'>
					<div className='md:col-span-2'>
						<Image
							src={product.image}
							alt={product.slug}
							height={'640'}
							width={'640'}></Image>
					</div>
					<div>
						<ul>
							<li>
								<h1 className='text-lg'>{product.name}</h1>
							</li>
							<li>Category: {product.category}</li>
							<li>Brand: {product.brand}</li>
							<li>{product.rating} - rated</li>
							<li>Description: {product.description}</li>
						</ul>
					</div>
					<div>
						<div className='card p-5'>
							<div className='mb-2 flex justify-between'>
								<div>Price</div>
								<div>${product.price}</div>
							</div>
							<div className='mb-2 flex justify-between'>
								<div>Status</div>
								<div>
									{product.countInStock > 0 ? 'In stock' : 'Unavalaible'}
								</div>
							</div>
							<button
								type='button'
								className='primary-button w-full'
								onClick={addToCartHandler}>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
export default ProductPage

export const getServerSideProps: GetServerSideProps<{
	data: ProductType
}> = async (context) => {
	const { params } = context
	const { slug } = params ?? { slug: '' }
	await db.connect()
	const product = await Product.findOne({ slug }).lean()
	try {
		return {
			props: {
				data: product,
			}, // will be passed to the page component as props
		}
	} catch (error) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		}
	}
}
