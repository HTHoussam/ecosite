import { UseFormRegister } from 'react-hook-form'
import { ShippingFormValues } from '../../../pages/shipping'
import ErrorSpan from '../../core/ErrorSpan'

const ShippingInput = ({
	label,
	inputId,
	inputRegisterCallBack,
	inputError,
}: {
	label: string
	inputId: string
	inputRegisterCallBack: UseFormRegister<ShippingFormValues>
	inputError: any
}) => {
	return (
		<div className='mb-4'>
			<label htmlFor={inputId} className='capitalize text-lg'>
				{label}
			</label>
			<input
				className='w-full'
				id={inputId}
				{...inputRegisterCallBack}
				autoFocus
			/>
			{inputError && <ErrorSpan message={inputError.message} />}
		</div>
	)
}

export default ShippingInput
