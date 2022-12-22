import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '../../../utils/helpers'
import ErrorSpan from '../../core/ErrorSpan'

type FormValues = {
	email: string
	password: string
}
const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>()
	const submitHandler = async ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			})
			if (!result) {
				return toast.error(`couldn't sign in`)
			}
			if (result.error) {
				return toast.error(result?.error)
			}
			toast.success('Successfully signed in')
		} catch (error: any) {
			toast.error(getError(error))
		}
	}

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className='mx-auto max-w-screen-md'>
			<h1 className='mb-4 text-xl'>login</h1>
			<div className='mb-4'>
				<label htmlFor='email' className='capitalize'>
					email
				</label>
				<input
					type='email'
					{...register('email', {
						required: 'Please enter email',
						pattern: {
							value:
								/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							message: 'Enter valid email address',
						},
					})}
					className='w-full'
					id='email'
					autoFocus
				/>
				{errors.email && <ErrorSpan message={errors.email.message ?? ''} />}
			</div>
			<div className='mb-4'>
				<label htmlFor='password' className='capitalize'>
					password
				</label>
				<input
					type='password'
					{...register('password', {
						required: 'You need to enter password',
						minLength: { value: 6, message: 'Enter atleas 6 characters' },
					})}
					className='w-full'
					id='password'
				/>
				{errors.password && (
					<ErrorSpan message={errors.password.message ?? ''} />
				)}
			</div>
			<div className='mb-4'>
				<button className='primary-button'>Login</button>
			</div>
			<div className='mb-4'>
				D&apos;ont have an account ? <Link href='/register'></Link>
			</div>
		</form>
	)
}

export default LoginForm
