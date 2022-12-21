import { createContext, useReducer } from 'react'
import { Product } from '../pages/types/types'

const initialState = {
	cart: { cartItems: [] },
}
export const Store = createContext<any>({})
const reducer = (
	state: { cart: { cartItems: Product[] } },
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload
			const existItem = state.cart.cartItems.find(
				(item: { id: any }) => item.id === newItem.id
			)
			const cartItems = existItem
				? state.cart.cartItems.map((item: { title: any }) =>
						item.title === existItem.title ? newItem : item
				  )
				: [...state.cart.cartItems, newItem]
			return { ...state, cart: { ...state.cart, cartItems } }
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
