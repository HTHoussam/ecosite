import { Menu } from '@headlessui/react'
import Link from 'next/link'
export type MenuItem = {
	label: string
	href: string
	className: string
	callbackFn?: () => void
}
const UserMenu = ({
	buttonLabel,
	menuItems,
}: {
	buttonLabel: string
	menuItems: MenuItem[]
}) => {
	return (
		<Menu as='div' className={'relative inline-block'}>
			<Menu.Button className={'text-blue-600'}>{buttonLabel}</Menu.Button>
			<Menu.Items
				className={'absolute right-0 w-56 origin-top-right bg-white shadow-lg'}>
				{menuItems.map((i) => {
					return (
						<Menu.Item key={i.label}>
							<Link
								href={i.href}
								className={i.className}
								onClick={i.callbackFn ?? (() => {})}>
								{i.label}
							</Link>
						</Menu.Item>
					)
				})}
			</Menu.Items>
		</Menu>
	)
}
export default UserMenu