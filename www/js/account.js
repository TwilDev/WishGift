//Declare listeners for pageshow and click events
$(document).on("pageshow", "#account", onPageShow);

$(document).on("click", "#userName", editName);

$(document).on("click", "#userEmail", editEmail);

$(document).on("click", "#userPassword", editPassword);

function onPageShow() {
    

    $('#userInfoList').empty();
    
    //Obtain user ID
    var userId = JSON.parse(localStorage.getItem("userObjectId"));
    
    //Get user information
    Backendless.UserService.getCurrentUser().then(function(currentUser){
        
        //append user information to page
        console.log(currentUser);
        $('#userInfoList').append(
            "<li><a id='userEmail' name='"+currentUser.email+"' class='ui-btn'>Email:  "+currentUser.email+"</a></li> <li><a id='userName' name='"+currentUser.name+"' class='ui-btn'>Name: "+currentUser.name+"</a></li> <li><a id='userPassword' class='ui-btn'>Reset Password</a></li>"
            
        );
        
    }).catch(function(error){
        
        //on error display alert
        alert(error);
        
    });

}

function editName() {
    
    //on selecting item save value for edit
    var userName = $('#userName').attr("name");
    localStorage.setItem("changeUserName", userName);
    //go to edit page
    window.location = "#changeAccountName";
    
}

function editEmail() {
    
    //on selecting item save value for edit
    var userEmail = $('#userEmail').attr("name");
    localStorage.setItem("changeUserEmail", userEmail);
    //go to edit page
    window.location = "#changeAccountEmail";
    
}

function editPassword() {
    //go to page
    window.location = "#changeAccountPassword";
}