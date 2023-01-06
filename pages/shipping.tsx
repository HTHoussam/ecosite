import Cookies from 'js-cookie'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/pages/shipping/CheckoutWizard'
import ShippingInput from '../components/pages/shipping/ShippingInput'
import { Store } from '../utils/store'
export type ShippingFormValues = {
	fullName: string
	address: string
	city: string
	postalCode: string
	country: string
}
const ShippingPage = () => {
	const { state, dispatch } = useContext(Store)
	const { cart } = state
	const { shippingAddress } = cart
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<ShippingFormValues>()
	useEffect(() => {
		setValue('fullName', shippingAddress.fullName)
		setValue('address', shippingAddress.address)
		setValue('city', shippingAddress.city)
		setValue('country', shippingAddress.country)
		setValue('postalCode', shippingAddress.postalCode)
	}, [setValue, shippingAddress])

	const shippingInputs: Array<{
		label: string
		id: string
		inputRegisterCallBack: any
		inputError: any
	}> = [
		{
			label: 'full name',
			id: 'fullName',
			inputRegisterCallBack: register('fullName', {
				required: 'Please enter full name',
			}),
			inputError: errors.fullName,
		},
		{
			label: 'Address',
			id: 'address',
			inputRegisterCallBack: register('address', {
				required: 'Please enter address',
				minLength: { value: 3, message: 'Address is more than 2 characters' },
			}),
			inputError: errors.address,
		},
		{
			label: 'City',
			id: 'city',
			inputRegisterCallBack: register('city', {
				required: 'Please enter city',
			}),
			inputError: errors.city,
		},
		{
			label: 'Postal Code',
			id: 'postalCode',
			inputRegisterCallBack: register('postalCode', {
				required: 'Please enter postal code',
			}),
			inputError: errors.postalCode,
		},
		{
			label: 'Country',
			id: 'country',
			inputRegisterCallBack: register('country', {
				required: 'Please enter country',
			}),
			inputError: errors.country,
		},
	]
	const shippingSubmitHandler = ({
		fullName,
		address,
		city,
		postalCode,
		country,
	}: ShippingFormValues) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				fullName,
				address,
				city,
				postalCode,
				country,
			},
		})
		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				shippingAddress: {
					fullName,
					address,
					city,
					postalCode,
					country,
				},
			})
		)
	}
	return (
		<Layout title='Shipping Page'>
			<>
				<CheckoutWizard activeStep={1} />
				<form
					action=''
					className='mx-auto max-w-screen-md'
					onSubmit={handleSubmit(shippingSubmitHandler)}>
					<h1 className='mb-4 text-xl'>Shipping Address</h1>

					{shippingInputs.map((i) => (
						<ShippingInput
							label={i.label}
							inputError={i.inputError}
							inputRegisterCallBack={i.inputRegisterCallBack}
							key={i.label}
							inputId={i.id}
						/>
					))}
					<div className='mb-4 flex justify-between'>
						<Link href={'/payment'}>
							<button className='primary-button'>Checkout</button>
						</Link>
					</div>
				</form>
			</>
		</Layout>
	)
}
export default ShippingPage
ShippingPage.auth = true