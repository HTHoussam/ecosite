import bcrypt from 'bcrypt'
const data = {
	users: [
		{
			name: 'admin',
			email: 'admin@email.com',
			password: bcrypt.hashSync('123456', 4),
			isAdmin: true,
		},
		{
			name: 'houssam',
			email: 'houssam@email.com',
			password: bcrypt.hashSync('123456', 4),
			isAdmin: false,
		},
	],
}
export default data
