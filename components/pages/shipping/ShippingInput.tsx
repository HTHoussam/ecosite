import { UseFormRegister } from 'react-hook-form'
import { ShippingAddressType } from '../../../types/types'
import ErrorSpan from '../../core/ErrorSpan'

const ShippingInput = ({
	label,
	inputId,
	inputRegisterCallBack,
	inputError,
}: {
	label: string
	inputId: string
	inputRegisterCallBack: UseFormRegister<ShippingAddressType>
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
				name={inputId}
				{...inputRegisterCallBack}
				autoFocus
			/>
			{inputError && <ErrorSpan message={inputError.message} />}
		</div>
	)
}

export default ShippingInput
