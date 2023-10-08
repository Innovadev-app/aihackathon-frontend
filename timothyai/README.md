# TimothyApp.ai Mobile

## Requirements
- Typescript
- React Native
- expo
- EAS
- Some Amplify

## Deploying new versions
The mobile app follows common [EAS](https://docs.expo.dev/eas/) steps to deploy the application. Only thing to be aware of when deploying is what env to deploy. When building dev or staging make sure that the file `aws-exports.js` at the root has the configurations from the respective environments. ie, when deploying staging, simply copy the contents from `/env/aws-exports-staging.js` and paste them in `aws-exports.js` 

