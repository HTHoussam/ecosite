import { UseFormRegister } from 'react-hook-form'
import { ShippingAddressType } from '../../../types/types'
import ErrorSpan from '../../core/ErrorSpan'

const ShippingInput = ({
	label,
	inputId,
	type = 'text',
	inputRegisterCallBack,
	inputError,
}: {
	label: string
	inputId: string
	type?: string
	inputRegisterCallBack: UseFormRegister<ShippingAddressType>
	inputError: any
}) => {
	return (
		<div className='mb-4'>
			<label htmlFor={inputId} className='capitalize text-lg'>
				{label}
			</label>
			<input
				type={type}
				className='w-full'
				id={inputId}
				name={inputId}
				{...inputRegisterCallBack}
			/>
			{inputError && (
				<ErrorSpan message={inputError.message ?? 'error on input'} />
			)}
		</div>
	)
}

export default ShippingInput
