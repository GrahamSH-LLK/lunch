import { schedules } from '$lib/special_dates.js';
/** @type {import('./$types').PageLoad} */
const isOnSameDay = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};
export async function load({ params }) {
	const slug = params.slug;
	return {
        all: params.slug === 'all',
        date: new Date(params.slug),
		schedules: schedules.filter((schedule) => {
			return (
				slug == 'all' || schedule.dates.some((date) => isOnSameDay(date, new Date(params.slug)))
			);
		})
	};
}
