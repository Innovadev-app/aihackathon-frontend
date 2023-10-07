# Smarthive mobile

## Requirements
- Typescript
- React Native
- expo
- EAS
- Some Amplify

## Running the App
You will need the environment variables to configure the app. 

### Configure an env
In the `/env` directory there are 2 env configurations: dev, and staging. The staging env is currently the one being used in an actual deployed build. Avoid using it for development. Their Terraform Cloud projects can be found here:

- [dev](https://app.terraform.io/app/smarthive-appdev/workspaces?project=prj-4iByohTdPyPnHLuZ)
- [staging](https://app.terraform.io/app/smarthive-appdev/workspaces?project=prj-PrkSrWSp2f1iDyhU)


## Deploying new versions
The mobile app follows common [EAS](https://docs.expo.dev/eas/) steps to deploy the application. Only thing to be aware of when deploying is what env to deploy. When building dev or staging make sure that the file `aws-exports.js` at the root has the configurations from the respective environments. ie, when deploying staging, simply copy the contents from `/env/aws-exports-staging.js` and paste them in `aws-exports.js` 

