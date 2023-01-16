export type ProductType = {
	_id: number
	quantity: number
	name: string
	slug: string
	category: string
	image: string
	price: number
	brand: string
	rating: number
	numReviews: number
	countInStock: number
	description: string
}
interface OrderedItems {
	name: string
	quantity: number
	image: string
	price: number
}
export interface ShippingAddressType {
	fullName: string
	address: string
	city: string
	postalCode: number
	country: string
}
export type OrderType = {
	_id: number
	user: number
	orderItems: Array<OrderedItems>
	shippingAddress: ShippingAddressType
	paymentMethod: string
	itemsPrice: number
	shippingPrice: number
	taxPrice: number
	totalPrice: number
	isPaid: boolean
	isDelivered: boolean
	paidAt: string
	deliveredAt: string
}
