require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function* s3Generator(bucketName, keys) {
  for (key of keys) {
    const params = {
      Bucket: bucketName,
      Key: key,
      // Body: version,
      Body: key,
    }

    try {
      const data = await s3.putObject(params).promise();
      yield key; 
    } catch (err) {
      yield err;
    }
  }
}

module.exports = s3Generator;
