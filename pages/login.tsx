import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/pages/login/LoginForm'
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
		<Layout title='login form'>
			<LoginForm />
		</Layout>
	)
}

export default LoginPage
