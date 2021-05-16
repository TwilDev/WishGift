/// User Login ///


function error(err) {
    //show err if failed to retrieve
    alert(err);
}

// obtained from https://github.com/Backendless/JS-SDK/tree/master/examples/user-service/simple-register-login 


//on button click create new user
$(document).on('click', '#login-btn', function() {
    
    //create a new user object
    var user = new Backendless.User();
    
    
    //Loop through each field in the register-field class
    $('.login-field').each(function () {
        
        //assign the names of each input to propertyName
        var propertyName = $(this)[0].name;
        console.log(propertyName);
        
        
        //console.log($(this).val());
        console.log($(this)[0].value);
        
        //console.log($(this).val());
        
        //assign property names to user object and set the value of each property name to the inputs value
        user[propertyName] = $(this)[0].value;
        //console.log(user.email);
    });
    
    //Call Backendless User service passing through the user object
    Backendless.UserService.login(user.email, user.password, true).then(function() {
        console.log('User authenticated:\n', user);
        window.location.replace("#home");
    }).catch(error);
})
