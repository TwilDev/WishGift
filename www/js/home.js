
//Create event listeners for device pauses and resumes
document.addEventListener("resume", onResume, false);
document.addEventListener("pause", onPause, false);

//Check for when device is prepared and APIS ready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    console.log("Hello World!");

    //Create event listeners for device pauses and resumes
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);

    
    //Initialize Backendless
    Backendless.initApp('A721C3AE-F98A-1BA0-FF1E-FB1227062A00','61ECF7F2-6AE1-4114-8EDE-FEC2F39EB6BF');

    //Initial check for if userID is stored in localstorage if not delegate to home for backendless cache check
    if(localStorage.getItem('userObjectId') == null) {
        
        //Relocate user to login page for verficiation
        window.location.replace("#home");
        
    };
    

}

//Initial checks called after device ready
$(document).on("pageshow","#home", onPageShow);
                               

//when page is loaded
function onPageShow() {
    
    console.log("teststart");
    // get objectId of the logged-in user:
    var userObjectId = Backendless.LocalCache.get("current-user-id");
    console.log(userObjectId);

    // get user-token of the logged-in user:
    var userToken = Backendless.LocalCache.get("user-token");
    console.log(userToken);

    // get current user object:
    var userObject = Backendless.UserService.getCurrentUser();
    console.log(userObject);
    
    localStorage.setItem('userObjectId', JSON.stringify(userObjectId));
    
    //check if they contain values    
    if (userToken !== undefined && userObject !== undefined) {
        console.log("got user object");
        window.location.replace('#wishlist');
    } else {
        console.log("got here");
        window.location.replace("#login");
    }
        

}

function onPause() {
    
    //Store current page loaded on
    var lastPage = document.activeElement.id;
    
    //Store current page in localStorage
    localStorage.setItem("lastPage", lastPage);
    
    var inputList = [];

    //Check if in form
    if (lastPage == "addWishlistItemForm") {
        
        //get image by src 
        var imgData = $('#imageHolderForm').attr("src");
        //Set img data to localStorage
        localStorage.setItem("imageData", imgData);
        
        //iterate through form inputs
        $(".addFormInput").each(function(){
        
            //get value of each input
            var item = $(this).val();
            
            //push value into array
            inputList.push(item);
        
        });
        
        //use JSON to set array to string and add to localstorage
        localStorage.setItem("lastPageInput", JSON.stringify(inputList));

    }
}

function onResume() {
    
    //Get Previous page
    var lastPage = localStorage.getItem("lastPage");
    
    //if user was on form
    if (lastPage == "addWishlistItemForm") {
        
        //get all saved inputs
        var item = JSON.parse(localStorage.getItem("lastPageInput"));
        
        var imgSrc = localStorage.getItem("imageData");
        
        $('#imageHolderForm').attr("src", imgSrc);
        
        //assign values to input fields 
        $('#addWishlistItemName').val(item[0]);
        $('#addWishlistItemPrice').val(item[1]);
        $('#addWishlistItemDesc').val(item[2]);
        
    }
    
    //Go to previous page
    window.location.replace("#"+lastPage);
    
    
}




