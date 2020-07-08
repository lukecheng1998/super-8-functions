//function to check for verification, making sure that emails are valid as well as making sure that password match
const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};
const isEmail = (email) => {
  //Regular Expression for the proper email format
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) {
    return true;
  } else {
    return false;
  }
};
//Check and make sure that all textfields are filled and are valid when signing up
exports.validateSignupData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Please enter an email address";
  } else if (!isEmail(data.email)) {
    errors.email = "Email must be a valid email address";
  }
  if (isEmpty(data.password)) {
    errors.password = "Please fill out a password";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  if (isEmpty(data.handle)) {
    errors.handle = "Please enter your name";
  }
  //Validates the data
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
//Check and make sure that all textfields are filled and are valid when logging in
exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Please sign in with your email";
  }
  if (isEmpty(data.password)) {
    errors.password = "Enter a password, please try again";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
//Get user details we might not need this method
exports.reduceUserDetails = (data) => {
  let userDetails = {};
  //Check to see if a user is sick or not
  //console.log(data.isSick);
  //console.log(userDetails.isSick);
  if(data.isSick === true){
    userDetails.isSick = data.isSick;
  }else if(data.isSick === false){
    userDetails.isSick = data.isSick
  }
  
  return userDetails;
};
