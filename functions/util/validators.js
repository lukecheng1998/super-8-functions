//function to check for verification, making sure that emails are valid as well as making sure that password match
const isEmpty = (string) => {
    if(string.trim() === ''){
        return true;
    }else{
        return false;
    }
}
const isEmail = (email) => {
    //Regular Expression for the proper email format
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)){
        return true;
    }else{
        return false;
    }
}
//Check and make sure that all textfields are filled and are valid when signing up
exports.validateSignupData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = 'Please enter an email address'
    }else if(!isEmail(data.email)){
        errors.email = 'Email must be a valid email address'
    }
    if(isEmail(data.password)){
        errors.password = 'Please fill out a password'
    }
    if(data.password !== data.confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }
    if(isEmpty(data.handle)){
        errors.handle = 'Please enter your name'
    }
    //Validates the data
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
//Check and make sure that all textfields are filled and are valid when logging in
exports.validateLoginData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = 'Please sign in with your email'
    }
    if(isEmpty(data.password)){
        errors.password = 'Incorrect Password, please try again'
    }
}
//Get user details
exports.reduceUserDetails = (data) => {
    let userDetails = {};
    if(!isEmpty(data.bio.trim())){
        userDetails.bio = data.bio
    }
    //allow anyone to connect to our website with having to type https://
    if(!isEmpty(data.website.trim())){
        if(data.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `http://${data.website.trim()}`;
        }else{
            userDetails.website = data.website;
        }
    }
    if(!isEmpty(data.location.trim())){
        userDetails;
    }
    return userDetails;
}
