import { NextApiRequest, NextApiResponse } from 'next'

export const getProducts = async (
    request: NextApiRequest,
    response: NextApiResponse
) => {
    try {
        const response = await fetch('https://dummyjson.com/products')
        return response
    } catch (error) {
        console.log('error', error)
        return error
    }
}
