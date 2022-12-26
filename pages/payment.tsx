import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/pages/shipping/CheckoutWizard'
import { Store } from '../utils/store'

const PaymentPage = () => {
	const router = useRouter()
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
	const { state, dispatch } = useContext(Store)
	const { cart } = state
	const { shippingAddress, paymentMethod } = cart
	useEffect(() => {
		if (!shippingAddress.address) {
			router.push('/shipping')
			return
		}
		setSelectedPaymentMethod(paymentMethod || '')
	}, [paymentMethod, router, shippingAddress.address])
	return (
		<Layout>
			<>
				<CheckoutWizard activeStep={2} />
				<form
					className='mx-auto max-w-screen-md'
					onSubmit={(e) => {
						e.preventDefault()
						if (!selectedPaymentMethod) {
							return toast.error('Payment method is required')
						}
						dispatch({
							type: 'SAVE_PAYMENT_METHOD',
							payload: selectedPaymentMethod,
						})
						Cookies.set(
							'cart',
							JSON.stringify({
								...cart,
								paymentMethod: selectedPaymentMethod,
							})
						)
					}}>
					<h1></h1>
					{['Paypal', 'Stripe', 'CashOnDelivery'].map((payment: string) => (
						<div key={payment} className='mb-4'>
							<input
								type='radio'
								name='paymentMethod'
								className='p-2 outline-none focus:ring-2'
								id={payment}
								checked={selectedPaymentMethod === payment}
								onChange={() => {
									setSelectedPaymentMethod(payment)
								}}
							/>
							<label htmlFor={payment} className='p-2'>
								{payment}
							</label>
						</div>
					))}
					<div className='mb-4 flex justify-between'>
						<button
							onClick={() => router.push('/shipping')}
							type='button'
							className='default-button'>
							back
						</button>
						<button className='primary-button' onClick={() => router.push('/')}>
							Next
						</button>
					</div>
				</form>
			</>
		</Layout>
	)
}

export default PaymentPage
