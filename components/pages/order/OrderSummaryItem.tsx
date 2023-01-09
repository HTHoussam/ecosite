const OrderSummaryItem = ({
	label,
	value,
}: {
	label: string
	value: number
}) => {
	return (
		<li>
			<div className='mb-2 flex justify-between'>
				<div>{label}</div>
				<div>${value}</div>
			</div>
		</li>
	)
}

export default OrderSummaryItem
