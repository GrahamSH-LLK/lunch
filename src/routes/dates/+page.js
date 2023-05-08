export async function load({ fetch }) {
	let res = await fetch(
		`https://clients6.google.com/calendar/v3/calendars/longmeadow.k12.ma.us_qpmvclo5b1bi0l67n8b7tr76so@group.calendar.google.com/events?calendarId=longmeadow.k12.ma.us_qpmvclo5b1bi0l67n8b7tr76so%40group.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=1000&sanitizeHtml=true&timeMin=${new Date().toISOString()}&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`,
		{
			headers: {},
			referrer:
				'https://clients6.google.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.yTSbWrSe458.O%2Fd%3D1%2Frs%3DAHpOoo_5dpdVCMe_LPx1yH-hHA2M85TB-Q%2Fm%3D__features__',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: null,
			method: 'GET',
			mode: 'cors'
		}
	);
	let data = await res.json();
	let { items } = data;
	//let future = items.filter((i) => new Date(i.start.dateTime).getTime() > new Date().getTime());
	let daysOff = items.filter((i) => i.summary.includes('No School'));
	
	console.log(daysOff);
	return { daysOff };
}
