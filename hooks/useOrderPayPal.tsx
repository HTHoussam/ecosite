import {
	SCRIPT_LOADING_STATE,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { useAsyncEffect } from 'ahooks'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { toast } from 'react-toastify'
import { OrderType } from '../types/types'
import { getError } from '../utils/helpers'

const reducer = (
	state: any,
	action: { type: string; payload?: OrderType | AxiosError }
) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' }
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		case 'PAY_REQUEST':
			return { ...state, loadingPay: true }
		case 'PAY_SUCCESS':
			return { ...state, loadingPay: false, successPay: true }
		case 'PAY_FAIL':
			return { ...state, loadingPay: false, errorPay: action.payload }
		case 'PAY_RESET':
			return { ...state, loadingPay: false, successPay: false, errorPay: '' }
		default:
			return state
	}
}
const useOrderPayPal = () => {
	const router = useRouter()
	const { id } = router.query
	const orderId = id
	const [{ order, successPay, loading, error, loadingPay }, dispatch] =
		useReducer(reducer, {
			loading: true,
			order: {},
			error: '',
		})
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
	useAsyncEffect(async () => {
		const fetchOrder = async () => {
			try {
				dispatch({
					type: 'FETCH_REQUEST',
				})
				const { data } = await axios.get<OrderType>(`/api/orders/${orderId}/`)
				dispatch({ type: 'FETCH_SUCCESS', payload: data })
			} catch (error: any) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
			}
		}
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			await fetchOrder()
			if (successPay) {
				dispatch({ type: 'PAY_RESET' })
			}
		} else {
			const loadPaypalScript = async () => {
				try {
					const { data: clientId } = await axios.get<string>('/api/keys/paypal')
					paypalDispatch({
						type: 'resetOptions',
						value: {
							'client-id': clientId,
							currency: 'USD',
						},
					})
					paypalDispatch({
						type: 'setLoadingStatus',
						value: SCRIPT_LOADING_STATE.PENDING,
					})
				} catch (error) {
					toast.error('Error on payment loading')
				}
			}
			await loadPaypalScript()
		}
	}, [order, orderId, paypalDispatch, successPay])
	const createOrder = (data: any, actions: any): Promise<string> => {
		return actions.order
			.create({
				purchase_units: [{ amount: { value: order.totalPrice } }],
			})
			.then((orderID: string) => {
				return orderID
			})
			.catch((error: any) => {
				toast.error(getError(error))
			})
	}
	const onApprove = (data: any, actions: any): Promise<void> => {
		return actions.order.capture().then(async function (details: any) {
			try {
				dispatch({ type: 'PAY_REQUEST' })
				const { data } = await axios.put<{ message: string; order: OrderType }>(
					`/api/orders/${order._id}/pay`,
					details
				)
				dispatch({ type: 'PAY_SUCCESS', payload: data.order })
				toast.success('Order is paid successfully')
			} catch (error) {
				dispatch({ type: 'PAY_FAIL', payload: getError(error) })
				toast.error(getError(error))
			}
		})
	}
	const onError = (error: any) => {
		toast.error(getError(error))
	}
	return [
		{
			createOrder,
			onApprove,
			onError,
			isPending,
			loading,
			error,
			loadingPay,
			order,
		},
	] as const
}
export default useOrderPayPal
