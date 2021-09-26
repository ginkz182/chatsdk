const axios = require('axios');
const fs = require('fs');
const csv = require('csvtojson');
const { Parser } = require('json2csv');
const fields = ['userId', 'deviceId', 'token'];
const json2csvParser = new Parser({ fields });

let results = [];
let promises = [];
let filename = './data/userdata.csv';
let outputfile = './data/userdata-token.csv';
let url = 'https://qatest.amity.co/v1/device'

const option = {
  header: {
    'x-api-key': 'kjsdkajdhkajhsdaksjdhaksjdhakjsdhq98w7eyq98we',
    'Content-Type': 'application/json'    
  }
}

const csvconverter = new Promise((resolve,reject) => {
  csv()
  .fromFile(filename)
  .then((json)=>{
      resolve(json);
  })
});

csvconverter.then(results => {
  results.forEach(data => {

    const reqbody = { 
        userId: data['userId'], 
        deviceId: data['deviceId'],
        deviceInfo: { "kind": "web", "model": "", "sdkVersion": "2.0" },
        displayName: data['userId']
      }

    promises.push(
      axios.post(url, reqbody, option)
      .then((res) => {
          data['token'] = res.data['token'];
      }).catch((err) => {
          console.error(err);
      }));
    });

  Promise.all(promises).then(() => {
    const csv = json2csvParser.parse(results);

    fs.writeFile(outputfile, csv, function(err) {
      if (err) throw err;
      console.log("Token generated: " + outputfile);
    })


  });

});
