const awsServerlessExpress = require('aws-serverless-express')
const express = require('express')
const app = express()
const https = require('https');
const sharp = require('sharp');
var imageUri = 'https://avatars1.githubusercontent.com/u/416456?s=460&v=4';


app.get('/:image', function (req, res) {
  // console.log(req.params.image);

  return https.get(imageUri, (resp) => {
    let body = '';

    resp.setEncoding('base64');

    resp.on('data', (data) => {
      body += data
    });
    res.contentType = 'image/jpeg';
    resp.on('end', () => {

      var img = new Buffer(body, 'base64');
      return sharp(img)
        .rotate()
        .resize(50)
        .toBuffer()
        .then(data => {

          res.set({
            'Content-Type': 'image/jpeg',
            'Content-Length': data.length,
            'isBase64Encoded': true
          });
          var image = new Buffer(data, 'base64');
          return image
        }).then(converted => {
          // console.log('IMAGE ', converted);
          res.send(converted)
          // res.end(converted, 'base64');
        })
        .catch(err => {
          console.log(err);
        });

    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });

})

// module.exports.handler = serverless(app);
const binaryMimeTypes = [
  // 'application/javascript',
  // 'application/json',
  'application/octet-stream',
  // 'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  // 'text/comma-separated-values',
  // 'text/css',
  'text/html',
  // 'text/javascript',
  // 'text/plain',
  // 'text/text',
  // 'text/xml'
];

// Create the AWS Lambda server.
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

// Export the AWS Lambda server proxy.
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);



// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log('Server Running');
// });
