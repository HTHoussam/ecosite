import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import RegisterForm from '../components/pages/login/RegisterForm'
const LoginPage = () => {
	const router = useRouter()
	const { redirect } = router.query
	const { data: session } = useSession()
	useEffect(() => {
		if (session?.user) {
			router.push((redirect as string) || '/')
		}
	}, [redirect, router, session?.user])
	return (
		<Layout title='Create Account'>
			<RegisterForm redirect={redirect} />
		</Layout>
	)
}

export default LoginPage
