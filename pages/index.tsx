import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import { ProductApiData } from '../types/types';
import { titleToSlug } from '../utils/helpers';

// const inter = Inter({ subsets: ['latin'] })

export default function Home({
	productsData,
}: {
	productsData: ProductApiData;
}) {
	return (
		<>
			<Layout>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
					{productsData ? (
						productsData.products.map((product) => (
							<ProductItem product={product} key={titleToSlug(product.title)} />
						))
					) : (
						<></>
					)}
				</div>
			</Layout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const fetchData: () => Promise<ProductApiData> = async () => {
		const data = await fetch('https://dummyjson.com/products');
		const json: ProductApiData = await data.json();
		return json;
	};
	try {
		const productsData = await fetchData();
		return {
			props: {
				productsData,
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}
};
