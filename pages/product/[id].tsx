import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { Product } from '../types/types'
import { useContext } from 'react'
import { Store } from '../../utils/store'
import { useRouter } from 'next/router'
//

const ProductPage = ({ data }: { data: Product }) => {
	const { state, dispatch } = useContext(Store)
	const router = useRouter()
	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find(
			(x: Product) => x.id === data.id
		)
		const quantity = existItem ? existItem.quantity + 1 : 1
		if (data.stock < quantity) {
			return alert('out of stock, Sorry!')
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...data, quantity } })
		router.push('/cart')
	}
	return (
		<Layout title={`${data.title}`}>
			<div className='py-2'>
				<Link href='/'>back to products</Link>

				<div className='grid md:grid-cols-4 md:gap-3'>
					<div className='md:col-span-2'>
						<Image
							src={data.images[0]}
							alt={data.title}
							height={'640'}
							width={'640'}></Image>
					</div>
					<div>
						<ul>
							<li>
								<h1 className='text-lg'>{data.title}</h1>
							</li>
							<li>Category: {data.category}</li>
							<li>Brand: {data.brand}</li>
							<li>{data.rating} - rated</li>
							<li>Description: {data.description}</li>
						</ul>
					</div>
					<div>
						<div className='card p-5'>
							<div className='mb-2 flex justify-between'>
								<div>Price</div>
								<div>${data.price}</div>
							</div>
							<div className='mb-2 flex justify-between'>
								<div>Status</div>
								<div>{data.stock > 0 ? 'In stock' : 'Unavalaible'}</div>
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

export const getServerSideProps: GetServerSideProps<{ data: Product }> = async (
	context
) => {
	const { params } = context
	const id = params ? params.id : -1
	const fetchData: () => Promise<Product> = async () => {
		const data = await fetch(`https://dummyjson.com/products/${id}`)
		const json: Product = await data.json()
		return json
	}
	try {
		const productsData = await fetchData()
		return {
			props: {
				data: productsData,
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
