import Link from 'next/link'

const ShippingDetails = ({
	shippingAddress,
}: {
	shippingAddress: {
		fullName: string
		address: string
		city: string
		postalCode: string
		country: string
	}
}) => {
	return (
		<div className='card p-5'>
			<h2 className='mb-2 text-lg'> Shipping Address</h2>
			<div>
				{shippingAddress.fullName},{shippingAddress.address},{' '}
				{shippingAddress.city},{shippingAddress.postalCode},{' '}
				{shippingAddress.country}
			</div>
			<div>
				<Link href={'/shipping'}>Edit</Link>
			</div>
		</div>
	)
}

export default ShippingDetails
