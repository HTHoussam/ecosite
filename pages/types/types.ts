export type Product = {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: Array<string>
	quantity: number
}
export type ProductApiData = {
	products: Array<Product>
	total: number
	skip: number
	limit: number
}
