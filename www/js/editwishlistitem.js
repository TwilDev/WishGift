//On page show for editing wishlist items
$(document).on("pageshow", "#editWishlistItemForm", onPageShow);

$(document).on("change", "input:radio[name=editGeo]", geoChange);

$(document).on ("click", "#editWishlistItemButton", editWishlistItem);

function onPageShow() {
    
   //parse values in JSON object
   var itemValues = JSON.parse(localStorage.getItem("editItemValues"));
   console.log(itemValues);
    


   //fill in input fields
   $('#editWishlistItemName').val(itemValues.name);
   $('#editishlistItemPrice').val(itemValues.price);
   $('#editWishlistItemDesc').val(itemValues.desc);
    
   //set hidden lat and long values by default
   $('#editGeoLong').val(itemValues.long);
   $('#editGeoLat').val(itemValues.lat);
   

   
}

function geoChange() {
    
    //if user selects new location
    if(this.checked && this.value == 1) {
        
        //get current location
        navigator.geolocation.getCurrentPosition(locationSuccess,locationFail);
        
        //on success
        function locationSuccess(position) {
                
                //assign to variables
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                
                //assign to input values
                $('#editGeoLong').val(longitude);
                $('#editGeoLat').val(latitude);
        }
        
        //on fail
        function locationFail(error){
            //
            alert(error);
        }
      // if user doesn't select location  
    } else {
        //if radio button is set to no, return original values 
        $('#editGeoLong').val(itemValues.long);
        $('#editGeoLat').val(itemValues.lat);
    }
}

function editWishlistItem() {
    
    //parse JSON string to object
    var testGet = JSON.parse(localStorage.getItem("wishlistSelectedItem"));
    
    console.log(testGet);
    
    //Get all inputs 
    var update = {
        objectId:testGet.id,
        wishlist_item_name:$('#editWishlistItemName').val(),
        wishlist_item_price: $('#editishlistItemPrice').val(), wishlist_item_description:$('#editWishlistItemDesc').val(),
        wishlist_item_category:$('#editWishlistItemCategorySelect option:selected').text(),
        wishlist_item_lat:$('#editGeoLat').val(),
        wishlist_item_long:$('#editGeoLong').val()
        
    }
    
    //send backendless query to update item
    Backendless.Data.of("WishList_Items").save(update).then(updateItem).catch(error);
    
    //on success
    function updateItem(updatedObject) {
        
        console.log("updated");
        //return to list
        window.location = "#wishlist-items";
    
    };
    
}