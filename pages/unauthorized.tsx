import { useRouter } from 'next/router'
import Layout from '../components/Layout'

const Unauthorized = () => {
	const router = useRouter()
	const { message } = router.query
	return (
		<Layout title={'Unauthorized access'}>
			<>
				<h1 className='text-2xl'> Access Denied</h1>
				{message && <div className='mb-4 text-red-500'>{message}</div>}
			</>
		</Layout>
	)
}

export default Unauthorized
