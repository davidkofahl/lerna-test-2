require('dotenv').config();
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const semver = require('semver');
const AWS = require('aws-sdk');
const listFiles = require('./list-files');
const s3Generator = require('./s3-get');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET;

// get all directories inside of common

// @TODO do not bump semver until successful built, need to invert this order
const ignored = [
  '@tny/scripts',
  '@tny/components',
  '@tny/webpack-config',
];

async function main() {
  console.log('Starting Deployment');

  let pkgs = [];

  // get changes
  try {
    const { stdout, stderr } = await exec('lerna changed -la --json');
    console.log(stderr);
    // Filter out non-story pkgs
    pkgs = JSON.parse(stdout.trim()).filter(({ name }) => ignored.indexOf(name) < 0);
  } catch (err) {}

  const pkgScope = pkgs.reduce((scope, { name }) => {
    console.log(`Adding ${name} to current build \n`);
    return scope + `--scope ${name}`;
  }, '');

  // Bootstrap Lerna scoped to changed packages to reduce build time
  try {
    console.log('Bootstrapping lerna');
    // const { stdout, stderr } = await exec(`lerna bootstrap --hoist ${pkgScope}`);
    const { stdout, stderr } = await exec(`lerna bootstrap`);
    console.log(stderr);
  } catch (err) {}

  try {
    // @TODO strategy for bumping version
    const { stdout, stderr } = await exec(`lerna version major --yes`);
    console.log(stderr);
  } catch (err) {
    console.log('lerna error', err);
  }


  // @TODO handling multiple story builds, run serial or parallel?
  // @TODO this isn't running in serial/waiting
  pkgs.forEach(async ({ name, location }) => {
    // get current tagged version
    const version = JSON.parse(fs.readFileSync(`${location}/package.json`)).version;

    // get current live version
    const key = `${name}/VERSION`;

    const params = {
      Bucket: bucketName,
      Key: key,
    }
    
    console.log(`Looking for a published version for ${name}`, params);

    let publishedVersion = null;

    try {
      const data = await s3.getObject(params).promise();

      if (data && data.Body) {
        publishedVersion = data.Body.toString().trim(); 
        console.log('found a VERSION on S3', publishedVersion);
      }
    // Object probably doesn't exist yet
    } catch (err) {
      // only care about stories not yet published (missing from S3 bucket)
      console.log('ERR fetching VERSION on S3', err);
      if (err.statusCode === 404) {
        publishedVersion = '0.0.0';
      }
    }

    console.log('have a published version? ', publishedVersion);
    
    // If current build is more recent than published version
    // Accounts for race conditions in multiple simultaneous builds
    // will always be true for stories not yet published
    if (publishedVersion && semver.gt(version, publishedVersion)) {
      console.log(`Need a new version for ${name}`);
      
      /* BUILD */
      try {
        await exec(`lerna run --scope ${name} build`);
        const files = listFiles(path.resolve('builds', name));
        const requests = s3Generator(bucketName, files);

        for await(const file of requests) {
          console.log('file written: ', file);
        }
      } catch (e) {
        console.log(`ERR building story ${name}: ${e}`);
      }

      /* WRITE */
      try {
        await s3.putObject({
          Bucket: bucketName,
          Key: key,
          Body: version,
        }).promise();
        console.log(`  - ${name} updated to ${version}`);
      } catch (err) {
        console.log(err);
      }

      // @TODO REMOVE
    } else {
      console.log('SEMVAR NOT GT');
    }
  });

  console.log('EXITING');
  // process.exit(0)
};

main();
