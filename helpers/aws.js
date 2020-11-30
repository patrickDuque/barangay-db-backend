const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId     : 'AKIAJ5QPZL4MWOX76VLQ',
  secretAccessKey : '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'
});

module.exports = s3;
