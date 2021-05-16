//On page show for editing account name
$(document).on("pageshow", "#changeAccountName", editAccountNameShow);
//On changing account name 
$(document).on("click", "#changeAccountNameBtn", editAccountNameConfirm);


//On page show for editing user email
$(document).on("pageshow", "#changeAccountEmail", editAccountEmailShow);
//On changing account email
$(document).on("click", "#changeAccountEmailBtn", editAccountEmailConfirm);


//on page show for editing password
$(document).on("pageshow", "#changeAccountPassword", editAccountPasswordShow);
//validating user password
$(document).on("click", "#changeAccountPasswordBtn", validate);

//Obtain user ID
var userId = JSON.parse(localStorage.getItem("userObjectId"));

function editAccountNameShow() {
    
    //get name from localStorage
    var fillInput = localStorage.getItem("changeUserName");
    //fill in inputs for editing name
    $('#changeAccountNameInput').val(fillInput);
    
}

function editAccountNameConfirm() {
    
    //get user changed name
    var changedName = $('#changeAccountNameInput').val();
    
    //assign values to user object
    var user = {
        
        objectId:userId,
        name:changedName
        
    }
    //create backendless query
    Backendless.UserService.update( user )
     .then( function( updatedUser ) {
      })
     .catch( function( error ) {
        alert(error);
      });

}

function editAccountEmailShow() {
    
    //get email from localStorage
    var fillInput = localStorage.getItem("changeUserEmail");
    //fill in inputs for editing email
    $('#changeAccountEmailInput').val(fillInput);
    
}

function editAccountEmailConfirm() {
    
    //get user changed name
    var changedEmail = $('#changeAccountEmailInput').val();
    
    //assign values to user object
    var user = {
        
        objectId:userId,
        email:changedEmail
        
    }
    
    //create backendless query
    Backendless.UserService.update( user )
     .then( function( updatedUser ) {
      })
     .catch( function( error ) {
        alert(error);
      });
    
    //execute logout procedure to force user to recreate session with new credentials
    $('#logout').click();

}

function editAccountPasswordShow() {
    
        
    //Empty error span as the class is used elsewhere
    $('.form-error p').empty();
    
}

function validate() {
    
    //get input value
    var newPass = $("#changeAccountPasswordInput").val();
    console.log(newPass);
    
    //Empty error span
    $('.form-error p').empty();
    
    //if password is empty
    if(newPass == "") {
        
        //print out error
       $('.form-error p').append("Password cannot be empty");
       
    //if password is less than 8 characters
    } else if(newPass.length < 8) {
        
        //print out error
       $('.form-error p').append("Password must be 8 characters or longer"); 
    
    //if password does not contain a number
    } else if (/\d/.test(newPass) == false){
        
        //print out error
        $('.form-error p').append("Password must contain a number"); 
        
    //If password does not contain lower case letters or uppercase letters
    } else if (/[a-z]/.test(newPass) == false || /[A-Z]/.test(newPass) == false) {
        
        //print out error
        $('.form-error p').append("Password must contain both an upper-case and lower-case letter"); 
        
    //If password has passed each of the tests
    } else {
        
        //pass text over to function for changing password
        changePassword(newPass);
    }
    
}

function changePassword(newPass) {
    
    //create new user object, passing through userId and newPass as properties
    var user = {
        
        objectId:userId,
        password:newPass
        
    }
    
    //create backendless query
    Backendless.UserService.update( user )
     .then( function( updatedUser ) {
      })
     .catch( function( error ) {
        alert(error);
      });
    
    //execute logout procedure to force user to recreate session with new credentials
    $('#logout').click();
    
}
