const ErrorSpan = ({
	message,
	bgColor = 'bg-red-400',
}: {
	message: string
	bgColor?: string
}) => {
	return (
		<div className={`${bgColor} mt-2 text-center rounded-md p-2`}>
			{message}
		</div>
	)
}
export default ErrorSpan
