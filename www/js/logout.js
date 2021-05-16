
function userLoggedOut() {
    console.log("user has been logged out");
    $('#returnToLogin').click();
    
}

function error(err) {
    //show err if failed to retrieve
    alert(err);
}

//on button click create new user
$(document).on('click', '#logout', function() {

    var userObjectId = Backendless.LocalCache.get("current-user-id");
    console.log(userObjectId);

    // get user-token of the logged-in user:
    var userToken = Backendless.LocalCache.get("user-token");
    console.log(userToken);
    
    Backendless.UserService.logout().then(userLoggedOut).catch(error);
  
})

