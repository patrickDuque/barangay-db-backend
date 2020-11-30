const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId     : process.env.AWS_KEY,
  secretAccessKey : process.env.AWS_ACCESS_KEY
});

module.exports = s3;
