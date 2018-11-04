const serverless = require('serverless-http');
const express = require('express')
const app = express()
const https = require('https');
const sharp = require('sharp');
var imageUri = 'https://avatars1.githubusercontent.com/u/416456?s=460&v=4';

const fs = require('fs');


app.get('/:image', function (req, res) {
  console.log(req.params.image);

  return https.get(imageUri, (resp) => {
    let body = '';

    resp.setEncoding('base64');

    resp.on('data', (data) => {
      body += data
    });

    resp.on('end', () => {
      var img = new Buffer(body, 'base64');

      sharp(img)
        .rotate()
        .resize(50)
        .toBuffer()
        .then(data => {
          // res.set('Content-Type', 'image/png');
          res.set({
            'Content-Type': 'image/jpg',
            'Content-Length': data.length,
            'isBase64Encoded': true
          });
          var image = new Buffer(data, 'base64');


          return image
        }).then(converted => {
          console.log('IMAGE ', converted);
          res.send(converted)
        })
        .catch(err => {
          console.log(err);
        });



    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });

})

module.exports.handler = serverless(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server Running');
});
