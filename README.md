# Super 8 on Backend
If you want to test the project make sure that you have postman:
This will allow you to test the functionality of what you wrote without ever needing to go to the front end
# Link
https://www.postman.com
https://cloud.google.com/sdk/docs/downloads-interactive
# Using Google's Cloud SDK
If you get an error like this: Could not load the default credentials. Browse to https://developers.google.com/accounts/docs/application-default-credentials for more information.

1. Be sure to navigate to the second link as stated above in order to install google's sdk, that way we can be sure that we can install the necessary files in order to write our functions to it.
2. Then run, gcloud auth application-default login on your command line and login with your gmail account
3. Then use visual studio's terminal and run firebase serve again, and it should work
# Installing and running Firebase
You probably won't need to do this

1. run these cmd:

npm install -g firebase-tools

2. firebase init
3. firebase login
Then you can use firebase serve to test the functions on your machine.

firebase deploy will allow you to upload the functions to firebase.
