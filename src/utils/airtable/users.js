var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appQkl29m9nQRQumu');

export const getUser = async () => {
  return new Promise((resolve, reject) => {
    base('Users').select({
      filterByFormula: '{email} = "miller.keaton22@gmail."',
      }).eachPage(function page(records, fetchNextPage) {
      records.forEach(async function(record) {
      console.log(record.id);
      const result = {
        id: record.id,
        fields: record.fields
      }
      resolve(result);
      }); 
      fetchNextPage();
      }, function done(error) {
        console.log(error)
        reject(error);
      });
  })  ;
}

const isValueInField = async (field, value) => 
  { const records = base('Users').selectRecords().filter
    (record => { return record.field === value }); 
    if (records.length > 0) return true; 
    else return false; }

export const createUser = async (userEmail) => {
    base('Users').create([
      {
        "fields": {
            email: userEmail
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

export const updateUser = async (userId, update) => {
  const {email, firstName, lastName, primaryPhone, secondaryPhone, address, city, postalCode} = update
  base('Users').update([
    {
      "id": userId,
      "fields": {
        "Email": email,
        "Last Name": lastName,
        "First Name": firstName,
        "Primary Phone": primaryPhone,
        "Secondary Phone": secondaryPhone,
        "Address": address,
        "City": city,
        "Postal Code": postalCode
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log(record.get('email'));
    });
  });
}