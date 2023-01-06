import mongoose, { LeanDocument } from 'mongoose'
const connection: {
	isConnected: boolean | number
} = {
	isConnected: 0,
}

async function connect() {
	if (typeof connection.isConnected === 'boolean' && connection.isConnected) {
		console.log('already connected')
		return
	}
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState
		if (connection.isConnected === 1) {
			console.log('use previous connection')
			return
		}
		await mongoose.disconnect()
	}
	// eslint-disable-next-line no-unused-vars
	const db = await mongoose.connect(process.env.MONGODB_URL ?? '')
	console.log('new connection')
}
async function disconnect() {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.disconnect()
			connection.isConnected = false
		} else {
			console.log('not disconnected')
		}
	}
}
const convertDocToObj = (doc: LeanDocument<any>) => {
	doc._id = doc._id.toString()
	doc.createdAt = doc.createdAt.toString()
	doc.updatedAt = doc.updatedAt.toString()
	return doc
}
const db = { connect, disconnect, convertDocToObj }
export default db
