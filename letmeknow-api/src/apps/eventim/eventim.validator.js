import dateFormat from 'dateformat';

export default function validate(details) {
    if (!details.url) {
        throw new Error('Missing field "URL"');
    }
    if (!details.date) {
        throw new Error('Missing field "date"');
    }

    let newDate = new Date(details.date);
    newDate = dateFormat(newDate, "yyyy-mm-dd");

    return {
        url: details.url,
        date: newDate
    }
}