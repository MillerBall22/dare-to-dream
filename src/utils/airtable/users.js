var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appQkl29m9nQRQumu');

export const getUser = async (email) => {
  return new Promise((resolve, reject) => {
    base('Users').select({
      filterByFormula: `{Email} = "${email}"`,
      }).eachPage(function page(records) {
        if (records.length === 0) {
          createUser(email);
          resolve(getUser(email))
        }
      records.every(async function(record) {
      const result = {
        id: record.id,
        fields: record.fields
      }
        resolve(result);
        return true
      }); 
      });
  });
}

export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    base('Users').find(id, function (err, record) {
      if (err) { 
        console.error(err); 
        return; 
      }
      const results = {
        id: record.id,
        fields: record.fields
      }
      resolve(results)
    });
  });
}

export const createUser = async (userEmail) => {
    base('Users').create([
      {
        "fields": {
            Email: userEmail
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