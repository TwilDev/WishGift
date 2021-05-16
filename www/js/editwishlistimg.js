//On page show for editing wishlist items
$(document).on("pageshow", "#editWishlistImgForm", onPageShow);
//on click for taking a new image
$(document).on("click", "#takeNewImgForWishlistItem", takePicture);
//on confirming new image
$(document).on("click", "#editWishlistImgButton", updateItemImage);

function onPageShow() {
    
    var values = JSON.parse(localStorage.getItem("editImg"));
    console.log(values.src);
    
    //Get values
    $('#currentImg').attr("src", values.src);
    
    $('#newImgContainer').hide();
}

function takePicture() {
    
    //Open camera and take picture
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth: 800, targetHeight: 800, destinationType: Camera.DestinationType.DATA_URL });
    
    function onPhotoDataSuccess(imageData) {
        
        //set to local storage
        localStorage.setItem("imageNew", imageData);
        
        //make div visible for new image
        $('#newImgContainer').toggle();
        
        //get image and display with new data
        var image = document.getElementById('newImg');
        image.style.display = "block";
        image.src = "data:image/jpeg;base64," + imageData;
        
    }
}

function updateItemImage() {
    
    
    //parse JSON string to object and get Item ID
    var testGet = JSON.parse(localStorage.getItem("wishlistSelectedItem"));
    console.log(testGet.id);
    
    var whereClause = "objectId = '" +testGet.id+ "'";
    //Create a query builder and set where clause
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    
    //Finds results from tasks, passing through query builder conditional
    Backendless.Data.of("Wishlist_items").find(queryBuilder).then(processResults).catch(error);
    
    function processResults(result) {
        
        //Get URL path of current wishlist item
        var currentImageSrc = result[0].wishlist_item_image_path;
        console.log(currentImageSrc);
        
        //Delete the exisitng image file held on the server via the URL
        Backendless.Files.remove( result[0].wishlist_item_image_path )
         .then( function() {
            console.log("deleted");
            
            
            //Get new image data 
            var newImgData = localStorage.getItem("imageNew");
            
            
            //turn to string
            const byteChar = atob(newImgData);
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
                 
                 //get saved fileURL
                 var itemFileUrl = savedFileURL;
                 
                //Create array for adding object
                var update = {
                    
                    objectId:testGet.id,
                    wishlist_item_image_path: itemFileUrl

                }
                
                //send backendless query to update file paths for imahe
                Backendless.Data.of("WishList_Items").save(update).then(updateItem).catch(error);
                 
                 
                function updateItem() {
                    
                    console.log("done");
                    //Return to wishlist items list
                    window.location = '#wishlist-items';
                } 
                 //if error in updating table
                function error(error) {
                    
                    console.log(error);
                }
             });
        
           
         })
        //if error 
         .catch( function( error ) {
            alert("error " +error);
         });
    
}
}