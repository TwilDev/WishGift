Backendless.initApp('A721C3AE-F98A-1BA0-FF1E-FB1227062A00','61ECF7F2-6AE1-4114-8EDE-FEC2F39EB6BF');
/// User Registration ///

function error(err) {
    //show err if failed to retrieve
    alert(err);
}

// obtained from https://github.com/Backendless/JS-SDK/tree/master/examples/user-service/simple-register-login 


//on button click create new user
$(document).on('click', '#register-btn', function() {
    //create a new user object
    var user = new Backendless.User();
    
    //Loop through each field in the register-field class
    $('.register-field').each(function () {
        
        //assign the names of each input to propertyName
        var propertyName = $(this)[0].name;
        
        //assign property names to user object and set the value of each property name to the inputs value
        user[propertyName] = $(this)[0].value;
    });
    
    //Call Backendless User service passing through the user object
    Backendless.UserService.register(user).then(function() {
        console.log('User registered:\n', user);
        
        //find hidden a tag with id of goback and click it to return to the main page
        $('#goback').click();
    }).catch(error);
})

