//Initialize Backendless
Backendless.initApp('A721C3AE-F98A-1BA0-FF1E-FB1227062A00','61ECF7F2-6AE1-4114-8EDE-FEC2F39EB6BF');


//init fileURL to a blank string 
var initName = "";

var parentObjectId = localStorage.getItem("parentId");
console.log(parentObjectId);


$(document).on("pageshow","#addWishlistItemForm", onPageShow);

$(document).on("click", "#addWishlistItemButton", addNewItem);

$(document).on("click", "#addNewCategory", addNewCategory);

function onPageShow() {
    
    //go through each input
    $('.addFormInput').each(function(){
        
        //loop through each input and clear values
        $(this).val("");
                           
    });
    
    //Clear image source and hide it
    $('#imageHolderForm').attr("src", "");
    $('#imageHolderForm').hide();
    
    //Obtain user ID
    var userId = JSON.parse(localStorage.getItem("userObjectId"));
    //Concat userID into where clause to get their results
    var whereClause = "ownerId = '" +userId+ "'";
    //Create a query builder and set where clause
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    
    //Finds results from tasks, passing through query builder conditional
    Backendless.Data.of("User_Options").find(queryBuilder).then(processResults).catch(error);
    
    function processResults(options) {

        //loop through user options and append to select dropdown
        for (var i=0; i < options.length; i++) {
            
            console.log(options[i].option_name);
             $('#wishlistItemCategorySelect').append(
                "<option value='"+options[i].option_name+"'>"+options[i].option_name+"</option>"
             )

        }
    };
    
    console.log("test");
    console.log(parentObjectId);
    //setup camera button click listener (shutter)
    $("#addWishlistItemImage").click(capturePhoto);


}             

function addNewCategory() {
    
    //get input value
   var newCategory = $('#addNewCategoryInput').val();
   console.log(newCategory);
    
    //append new value to select
    $('#wishlistItemCategorySelect').append(
        "<option value='"+newCategory+"'>"+newCategory+"</option>"
    );
    
    //convert to object
    var option = {
        
        option_name:newCategory
    }
    
    //save object to options table
    Backendless.Data.of("User_Options").save(option).then(function (savedObject) {
        
        console.log("saved");
    });

    
}

function capturePhoto() {
    console.log("capturePhoto");
    
    //Open camera and take picture
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth: 800, targetHeight: 800, destinationType: Camera.DestinationType.DATA_URL });
}
	
function onPhotoDataSuccess(imageData) {
    console.log("onPhotoDataSuccess");
    
    //From base64 to blob used part of the solution here https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    console.log(imageData);
    
    localStorage.setItem("imageInfo", imageData);
    
    var image = document.getElementById('imageHolderForm');
    image.style.display = "block";
    image.src = "data:image/jpeg;base64," + imageData;
    

    
}

function onFail(message) {
    //display error message
      alert('Failed because: ' + message);
}



function addNewItem() {
    
    //empty out error message
    $('.form-error p').empty();
    
    //define bool flag for validation
    var valFlag = false;
    
    //go through each input
    $('.addFormInput').each(function(){
        
        //loop through each input
        if($(this).val() == "") {
            
            console.log("null values");
            //set flag to true if value is empty
            valFlag = true;
            
        }
                           
    });
    
    //If flag is true break from the rest of function
    if (valFlag) {
        //Print out error
        $('.form-error p').append("Please enter a title, price and description"); 
        return false;
        
    }

    //Check if user wants to save location
    if ($('#geoLocTrue').is(':checked')) {
        
        //Get current Posisiton
        navigator.geolocation.getCurrentPosition(locationSuccess,locationFail);
            
            //declare vairbales and assign position
            function locationSuccess(position) {

                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                
                
                //assign to values    
                $('#geoLong').val(longitude);
                $('#geoLat').val(latitude);
            }
            //catch error
            function locationFail(error){
                alert(error);
            }

    }
        
    $('#locationVal').listview('refresh');
    
    
    //Get image information cached
    var imageData = localStorage.getItem("imageInfo");
    
    //turn to string
    const byteChar = atob(imageData);
    const byteNum = new Array(byteChar.length);
    
    //get unicode value of image data
    for (let i=0; i<byteChar.length; i++) {
        byteNum[i] = byteChar.charCodeAt(i);
    }
    
    //create a new blob from imagedata
    const byteArray = new Uint8Array(byteNum);
    const blob = new Blob([byteArray]);
    console.log(blob);
    
    
    //generate random string for file name
    var randomStr = Math.random().toString(36).substr(2, 14);
    console.log(randomStr);
    var fileName = initName.concat(randomStr);
    console.log(fileName);
    
    
    //Save image and retrieve the image path
    Backendless.Files.saveFile("/imgTest", fileName + ".png", blob).then(function(savedFileURL){
        
        //Data binding
        var itemName = $('#addWishlistItemName').val();
        var itemPrice = $('#addWishlistItemPrice').val();
        var itemDesc = $('#addWishlistItemDesc').val();
        var itemCategory = $('#wishlistItemCategorySelect option:selected').text();
        var itemFileUrl = savedFileURL;
        
        var itemLat = $('#geoLat').val();
        console.log(itemLat);
        var itemLong = $('#geoLong').val();
        console.log(itemLong);
        
        
        //Create array for adding object
        var wishListItem = {
            
            wishlist_item_name: itemName,
            wishlist_item_price: itemPrice,
            wishlist_item_description: itemDesc,
            wishlist_item_category: itemCategory,
            wishlist_item_image_path: itemFileUrl,
            wishlist_item_lat: itemLat,
            wishlist_item_long: itemLong,
        }
    
        //declare added object as array
        var addedObject = [];

        //save wishlist item 
        Backendless.Data.of("WishList_Items").save(wishListItem).then(function (savedObject) {

            console.log("object Saved" + savedObject.objectId);

            //push new objectId to addedObject Array
            addedObject.push(savedObject.objectId);

            console.log(addedObject);
            
            console.log("check Parent ID " +parentObjectId);

            //// ------ ADDING CHILD OBJECT WITH RELATIONSHIP TO PARENT ------ ////

            //Use the returned addedObject to create relationship with parentId 
            Backendless.Data.of("Wishlist").addRelation(parentObjectId, "wishlist_child_items", addedObject)
            .then( function(count){
                console.log("relation added");
            })
            .catch( function(error){
                console.log("Error! " + error.message);
            });


        })
        .catch (function (error){
           console.log(error.message); 
        });
        
        console.log("file saved" + savedFileURL);
            //var image = document.getElementById('image');
            //image.style.display = "block";
            //image.src = savedFileURL;
        
        //Show a toast for adding new item
        window.plugins.toast.showShortBottom("Item Added Successfully");

        window.location.replace('#wishlist-items');
        
    }).catch(function(error){
        //if image not saved output error
        alert("error - " + error.message);
    });

    
}

