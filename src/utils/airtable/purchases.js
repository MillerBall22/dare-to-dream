// var Airtable = require('airtable');
// var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appivDaLROdZVqghr');

// export const createPurchase = async (purchaseInfo) => {
//     const {date, lastName, firstName, email, primaryPhone, secondaryPhone, address, city, postalCode, ticketsPurchased, singleTicket, threeTickets, tenTickets, fiftyFiftyTickets, totalPrice, credit, expiry, CVC} = purchaseInfo;
//     base('Purchases').create([
//       {
//         "fields": {
//           "Date": date,
//           "Last Name": lastName,
//           "First Name": firstName,
//           "Email": email,
//           "Primary Phone": primaryPhone,
//           "Secondary Phone": secondaryPhone,
//           "Address": address,
//           "City": city,
//           "Postal Code": postalCode,
//           "Tickets Purchased": ticketsPurchased,
//           "Single Ticket": singleTicket,
//           "3 Tickets": threeTickets,
//           "10 Tickets": tenTickets,
//           "50/50 Tickets": fiftyFiftyTickets,
//           "Total Price": totalPrice,
//           "Credit Number": credit,
//           "Expiration Date": expiry,
//           "CVC": CVC,
//           "Payment Status": "Unpaid",
//         }
//       }
//     ], function(err, records) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       records.forEach(function (record) {
//         console.log(record.getId());
//       });
//     });
// }