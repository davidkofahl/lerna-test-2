# TODO
<!-- * handling versioning bump,  -->
<!-- * call webpack from build script or through lerna? -->
<!-- * handle story name collisions, enforce that pkg name and directories match, if -->
<!-- they don't, they aren't built -->
<!-- * pushing to S3 -->
* what to do with assets
* `npm link` for tny scaffolding
* config for environments, such as copilot api endpoints, s3 buckets 
* how to handle non-react components in component library
* encoding share links, sync up with lily and nick
* Jenkins triggers on pushes staging and production
* Git commit message format, MAJOR, MINOR, PATCH

# Build & Deploy Steps

1. Prebuild
  - Ensure unique package names
  - Validate all required fields present & well-formed in package.json
  - Fetch Article data via the Copilot API
2. Build
  - Compiles JS, Sass
3. Deploy
  - Writes to S3, 
  - most recent deploy is written to a directory called `latest`
  - saves three most recent deploys
  - deletes all stale deploys
4. Post-Deploy 
  - Write new interactive override URL to copilot via the API
  - Purge article cache

# Story

At a minimum each package needs the following files:

- package.json

# S3 deploy directory structure
  - `<story-name/latest/index.html`
  - `<story-name>/<version>/index.html`

# Required fields in package.json

- `name`
- `articleId: { production: <articleId> }`
- `private: true`
- `version`
- `scripts: { build: <command> }`



1. git push
2. on jenkins push hook, check for changed packages `lerna changed -la --json`
3. get changes build, then push to S3, get S3 location from package.json
4. on success, 

https://github.com/mitterio/js-sdk/blob/master/ci-scripts/publish-tsdocs.sh
