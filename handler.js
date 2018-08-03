'use strict';

const http = require('http');
const https = require('https');
const sharp = require('sharp');

var imageUri = 'https://c2.staticflickr.com/2/1723/27650518707_a230a7ccfa_c.jpg';

module.exports.resize = (event, context, callback) => {
  var body = '';
  https.get(imageUri, (resp) => {

    resp.setEncoding('base64');

    resp.on('data', (data) => {
      body += data
    });

    resp.on('end', () => {

      let imgBuffer = Buffer.from(body, 'base64');
      sharp(imgBuffer)
        .rotate()
        .resize(200)
        .toBuffer()
        .then(data => {

          const res = {
            statusCode: 200,
            isBase64Encoded: true,
            headers: {
              'Content-Type': 'image/jpg',
            },
            body: data
          };

          callback(null, res);

        })
        .catch(err => {
          console.log(err);
        });



    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });





};