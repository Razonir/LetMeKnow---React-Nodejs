import dateFormat from 'dateformat';

export default function validate(details) {
    if (!details.url) {
        throw new Error('Missing field "url"');
    }
    let searchIndex=details.url.lastIndexOf('res.hotels.co.il/reservation/search.php')
    let hotelsMainIndex=details.url.lastIndexOf('hotels.co.il/hotelsmain/hotels/Hotel.cfm')
    let hhidIndex=details.url.indexOf('hhid')
    let hotelIdIndex=details.url.lastIndexOf('HotelID')
    /* (searchIndex!=-1&&hhidIndex!=-1) checks if the url is with the type of 'res.hotels.co.il/reservation/search.php')
    and (hotelsMainIndex!=-1&&hotelIdIndex!=-1) checks if the url iswith the type of 'hotels.co.il/hotelsmain/hotels/Hotel.cfm'. if it's not both the url is wrong.*/
    if(!((searchIndex!=-1&&hhidIndex!=-1)||hotelsMainIndex!=-1&&hotelIdIndex!=-1)) 
        throw new Error("The url isn't a url of an hotel page at hotels.co.il .")
    if (!details.startDate) {
        throw new Error('Missing field "startDate"');
    }
    if (!details.endDate) {
        throw new Error('Missing field "endDate"');
    }
    let newStartDate = new Date(details.startDate);
    newStartDate = dateFormat(newStartDate, "yyyy-mm-dd");
    let newEndDate = new Date(details.endDate);
    newEndDate = dateFormat(newEndDate, "yyyy-mm-dd");
    if (!details.adults) {
        throw new Error('Missing field "adults"');
    }
    let hhid
    if (hhidIndex==-1)
        hhid=details.url.substring((hotelIdIndex)+(new String('hotelid=').length),details.url.length)
    else
        hhid=details.url.substring(hhidIndex+(new String('hhid=').length),details.url.indexOf('&',details.url.indexOf('hhid')))    
    return {
        hhid: hhid,
        startDate:newStartDate,
        endDate: newEndDate,
        adults: details.adults,
        children: details.children==null?0:details.children,
        infants: details.infants==null?0:details.infants,
    }
}
