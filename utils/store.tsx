import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'
import { ProductType } from '../types/types'

const initialState = {
	cart: Cookies.get('cart')
		? JSON.parse(Cookies.get('cart') ?? '')
		: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
}
export const Store = createContext<any>({})
const reducer = (
	state: {
		cart: {
			cartItems: ProductType[]
			shippingAddress: Object
			paymentMethod: string
		}
	},
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload
			const existItem = state.cart.cartItems.find(
				(item: ProductType) => item._id === newItem._id
			)
			const cartItems = existItem
				? state.cart.cartItems.map((item: ProductType) =>
						item.name === existItem.name ? newItem : item
				  )
				: [...state.cart.cartItems, newItem]
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
			return { ...state, cart: { ...state.cart, cartItems } }
		}
		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(
				(item) => item._id !== action.payload._id
			)
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
			return { ...state, cart: { ...state.cart, cartItems } }
		}
		case 'CART_RESET': {
			return {
				...state,
				cart: {
					cartItems: [],
					shippingAddress: { location: {} },
					paymentMethod: '',
				},
			}
		}
		case 'SAVE_SHIPPING_ADDRESS': {
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: {
						...state.cart.shippingAddress,
						...action.payload,
					},
				},
			}
		}
		case 'SAVE_PAYMENT_METHOD': {
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload,
				},
			}
		}
		default:
			return state
	}
}
export function StoreProvider({ children }: { children: JSX.Element }) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const value = { state, dispatch }
	return <Store.Provider value={value}>{children}</Store.Provider>
}
