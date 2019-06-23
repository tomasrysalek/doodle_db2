const SERVICE_ACCT_ID = 'doodleauth-242318@appspot.gserviceaccount.com';
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = {
	'primary': 'tomas.rysalek@gmail.com',
	'calendar-1': 'calendar1@group.calendar.google.com',
	'calendar-2': 'calendar2@group.calendar.google.com'
};
const key = require('./doodleauth-242318-a7863dfe8432.json').private_key;

module.exports.key = key;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
