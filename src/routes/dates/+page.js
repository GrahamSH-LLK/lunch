export const load = async () => {
    const res = await fetch(
        `https://clients6.google.com/calendar/v3/calendars/longmeadow.k12.ma.us_giqhrfti31osu08rr36po3pvl0@group.calendar.google.com/events?calendarId=longmeadow.k12.ma.us_giqhrfti31osu08rr36po3pvl0%40group.calendar.google.com&singleEvents=true&eventTypes=default&eventTypes=focusTime&eventTypes=outOfOffice&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2024-08-15T00%3A00%3A00-04%3A00&timeMax=2025-07-15T00%3A00%3A00-04%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs&%24unique=gc237`
      );
      const data = await res.json();
      
      const allDays = data.items.filter((item) => {
        return  /Day [1-8]+/.test(
          item.summary
        );
      });
      const fridays = allDays.filter((item) => {
        return new Date(item.end.date).getDay() === 5 ;
      });
      
      const countsFromDays = (daysInput) => {
        const days = daysInput.map((item) => {
          return parseInt(item.summary.split(" ")[1]);
        });
        const countPerDay = days.reduce((acc, day) => {
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {});
        const countPerDayReduced = Object.entries(countPerDay).reduce(
          (acc, [key, value]) => {
            let day = key % 4;
            if (day === 0) {
              day = 4;
            }
            acc[day] = (acc[day] || 0 ) + value;
            return acc;
          },
          {}
        );
        return {
          countPerDay,
          countPerDayReduced,
        };
      };

      return {
        fridays: countsFromDays(fridays),
        allDays: countsFromDays(allDays)
      }

}