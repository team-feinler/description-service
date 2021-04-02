const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const fs = require('fs');

var AWS = require('aws-sdk');
// Set the region 
// AWS.config.update({region: process.env.REGION});

// Create S3 service object
s3 = new AWS.S3();

const bucketParams = {
  Bucket: process.env.AWS_BUCKET
};

const upload = async () => {
  try {
    const bundle = fs.readFileSync(path.join(__dirname, '../', 'public', 'description_bundle.js'));
    const putObject = {Bucket: process.env.AWS_BUCKET, Key: 'bundle/description.js', Body: bundle};
    await s3.createBucket(bucketParams).promise().catch(err => console.log(err));
    await s3.putObject(putObject).promise();
    console.log('upload to s3 successful');
  } catch (error) {
    console.log(error);
  }
};

upload();