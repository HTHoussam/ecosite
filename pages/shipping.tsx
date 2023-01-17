import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/pages/shipping/CheckoutWizard'
import ShippingInput from '../components/pages/shipping/ShippingInput'
import { ShippingAddressType } from '../types/types'
import { getError } from '../utils/helpers'
import { Store } from '../utils/store'
const ShippingPage = () => {
	const router = useRouter()
	const { state, dispatch } = useContext(Store)
	const { cart } = state
	const { shippingAddress } = cart
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<ShippingAddressType>({ mode: 'all' })
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
		type: string
		inputRegisterCallBack: any
		inputError: any
	}> = [
		{
			label: 'full name',
			id: 'fullName',
			type: 'text',
			inputRegisterCallBack: register('fullName', {
				required: 'This field is required',
			}),
			inputError: errors.fullName,
		},
		{
			label: 'Address',
			id: 'address',
			type: 'text',
			inputRegisterCallBack: register('address', {
				required: 'This field is required',
				minLength: { value: 3, message: 'Address is more than 2 characters' },
			}),
			inputError: errors.address,
		},
		{
			label: 'City',
			id: 'city',
			type: 'text',
			inputRegisterCallBack: register('city', {
				required: 'This field is required',
			}),
			inputError: errors.city,
		},
		{
			label: 'Postal Code',
			id: 'postalCode',
			type: 'number',
			inputRegisterCallBack: register('postalCode', {
				required: 'This field is required',
				valueAsNumber: true,
			}),
			inputError: errors.postalCode,
		},
		{
			label: 'Country',
			id: 'country',
			type: 'text',
			inputRegisterCallBack: register('country', {
				required: 'This field is required',
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
	}: ShippingAddressType) => {
		try {
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
			if (Object.keys(errors).length === 0) {
				router.push('/payment')
			}
		} catch (error) {
			toast.error(getError(error))
		}
	}
	return (
		<Layout title='Shipping Page'>
			<>
				<CheckoutWizard activeStep={1} />
				<form
					className='mx-auto max-w-screen-md'
					onSubmit={handleSubmit(shippingSubmitHandler)}>
					<h1 className='mb-4 text-xl'>Shipping Address</h1>
					{shippingInputs.map((i) => (
						<ShippingInput
							type={i.type}
							label={i.label}
							inputError={i.inputError}
							inputRegisterCallBack={i.inputRegisterCallBack}
							key={i.label}
							inputId={i.id}
						/>
					))}
					<div className='mb-4 flex justify-between'>
						<button className='primary-button'>Checkout</button>
					</div>
				</form>
			</>
		</Layout>
	)
}

ShippingPage.auth = true
export default ShippingPage
