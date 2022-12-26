import { NextApiRequest, NextApiResponse } from 'next';

export const getProducts = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const result = await fetch('https://dummyjson.com/products');
		return res.send({ result });
	} catch (error: any) {
		console.log('error', error);
		res.send({ error: error.message });
		return error;
	}
};
