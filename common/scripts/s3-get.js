require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET;

async function main() {
  const key = `one-dupe/VERSION`;

  const params = {
    Bucket: bucketName,
    Key: key,
  }

  const data = await s3.getObject(params).promise();

  console.log('data', data);
};

main();
