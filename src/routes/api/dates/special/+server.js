import {schedules} from '$lib/special_dates.js';
/** @type {import('./$types').RequestHandler} */
const isOnSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};
export async function GET({url}) {
    let slug = url.searchParams.get('date');
    let filteredSchedules = schedules.filter((schedule) => {
        return !slug?.length || schedule.dates.some((date) => isOnSameDay(date, new Date(slug)));
    });

    return new Response(JSON.stringify(filteredSchedules), {
        headers: {
            'content-type': 'application/json',
        },
    });

    

}
