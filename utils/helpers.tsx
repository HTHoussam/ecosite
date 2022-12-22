export function titleToSlug(title: string): string {
	// Replace all non-alphanumeric characters with hyphens
	let slug = title.replace(/[^a-z0-9]/gi, '-')

	// Convert the string to all lowercase
	slug = slug.toLowerCase()

	// Trim any leading or trailing hyphens
	slug = slug.trim()

	return slug
}
export function getError(error: any) {
	if (error.response && error.response.data && error.response.data.message) {
		return error.response.data.message
	} else {
		return error.message
	}
}
