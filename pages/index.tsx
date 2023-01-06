import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product'
import { ProductType } from '../types/types'
import db from '../utils/db'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }: { products: Array<ProductType> }) {
	return (
		<>
			<Layout>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
					{products ? (
						products.map((product) => (
							<ProductItem
								// addToCartHandler={addToCartHandler}
								product={product}
								key={product.slug}
							/>
						))
					) : (
						<></>
					)}
				</div>
			</Layout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	await db.connect()
	const products = await Product.find().lean()
	try {
		return {
			props: {
				products: products.map(db.convertDocToObj),
			},
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
