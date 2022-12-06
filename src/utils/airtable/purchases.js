var Airtable = require('airtable');
var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appQkl29m9nQRQumu');

export const createPurchase = async (purchaseInfo) => {
    const {id, lastName, firstName, email, primaryPhone, secondaryPhone, address, city, postalCode, ticketsPurchased, singleTicket, threeTickets, tenTickets, fiftyFiftyTickets, totalPrice} = purchaseInfo;
    base('Purchases').create([
      {
        "fields": {
            "Id": id,
            "Last Name": lastName,
            "First Name": firstName,
            "Email": email,
            "Primary Phone": primaryPhone,
            "Secondary Phone": secondaryPhone,
            "Address": address,
            "City": city,
            "Postal Code": postalCode,
            "Tickets Purchased": ticketsPurchased,
            "Single Ticket": singleTicket,
            "3 Tickets": threeTickets,
            "10 Tickets": tenTickets,
            "50/50 Tickets": fiftyFiftyTickets,
            "Total Price": totalPrice
          }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
}