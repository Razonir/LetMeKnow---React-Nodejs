import dateFormat from 'dateformat';

export default function validate(details) {
    if (!details.from) {
        throw new Error('Missing field "from"');
    }
    if (!details.date) {
        throw new Error('Missing field "date"');
    }

    let newDate = new Date(details.date);
    newDate = dateFormat(newDate, "dd-mm-yyyy");

    if (!details.to) {
        throw new Error('Missing field "to"');
    }
    if (!details.adults) {
        throw new Error('Missing field "adults"');
    }
    if (!details.children) {
        throw new Error('Missing field "children"');
    }
    if (!details.department) {
        throw new Error('Missing field "department"');
    }

    return {
        from: details.from,
        date: newDate,
        to: details.to,
        adults: details.adults,
        children: details.children,
        department: details.department
    }
}