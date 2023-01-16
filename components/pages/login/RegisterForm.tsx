import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '../../../utils/helpers'
import ErrorSpan from '../../core/ErrorSpan'

type FormValues = {
	name: string
	email: string
	password: string
	confirmPassword: string
}
const RegisterForm = ({
	redirect,
}: {
	redirect: string | string[] | undefined
}) => {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm<FormValues>()
	const submitHandler = async ({
		name,
		email,
		password,
	}: {
		name: string
		email: string
		password: string
	}) => {
		try {
			const { data } = await axios.post<{
				message: string
				_id: number
				name: string
				isAdmin: boolean
				email: string
			}>('/api/auth/register', {
				name,
				email,
				password,
			})
			if ((data as any).error === true) {
				router.push('/')
			}
			if (data && data.email) {
				toast.success('Successfully registered user')
				const result = await signIn('credentials', {
					redirect: true,
					email: data.email,
					password: password,
				})
				if (result && result.error) {
					toast.error(getError(result.error))
				}
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
				<label htmlFor='name' className='capitalize'>
					name
				</label>
				<input
					type='text'
					{...register('name', {
						required: 'Name required',
					})}
					className='w-full'
					id='name'
					autoFocus
				/>
				{errors.name && <ErrorSpan message={errors.name.message ?? ''} />}
			</div>
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
				<label htmlFor='confirmPassword' className='capitalize'>
					confirm password
				</label>
				<input
					type='password'
					{...register('confirmPassword', {
						required: 'You need to enter password',
						validate: (value) => value === getValues('password'),
						minLength: { value: 6, message: 'Enter atleas 6 characters' },
					})}
					className='w-full'
					id='confirmPassword'
				/>
				{errors.confirmPassword && (
					<ErrorSpan message={errors.confirmPassword.message ?? ''} />
				)}
				{errors.confirmPassword?.type === 'validate' && (
					<ErrorSpan message={`Password do not match` ?? ''} />
				)}
			</div>
			<div className='mb-4'>
				<button className='primary-button'>Register</button>
			</div>
			<div className='mb-4'>
				D&apos;ont have an account ?{' '}
				<Link href={`/register?redirect=${redirect ?? '/'}`}>Register</Link>
			</div>
		</form>
	)
}

export default RegisterForm
