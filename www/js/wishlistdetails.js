//setup click event listeners and page show listener for populating fields 

$(document).on("pageshow","#wishlist-item-details", onPageShow);

$(document).on("click", ".item-details", updateInfo);

$(document).on("click", "#deleteSelectedItem", deleteItem);

$(document).on("click", "#editWishlistItem", editInfo);

$(document).on("click", "#editWishlistImg", editImg);

$(document).on("click", "#showItemOnMap", showLocation);

function error(err) {
    //show err if failed to retrieve
    alert(err);
}

function onPageShow() {
    
    //parse JSON string to object
    var get = JSON.parse(localStorage.getItem("wishlistSelectedItem"));

    
    //Populate fields with item information
    
    $('#wishlistSelectedName').text(get.name);
    
    $('#wishlistSelectedImg').attr("src", get.img);
    
    $('#wishlistSelectedPrice').text(get.price);
    
    $('#wishlistSelectedDesc').text(get.desc);
    
    $('#wishlistSelectedCategory').text(get.category);
    
    $('.wishlist-item-details').attr("id", get.id);
    
    $('#wishlistSelectedLat').val(get.lat);
    
    $('#wishlistSelectedLong').val(get.long)
    
}



function editInfo() {
    
    //Get Values for Editing
    var itemId = $('wishlist-item-details').attr('id');
    var itemName = $('#wishlistSelectedName').text();
    var itemPrice = $('#wishlistSelectedPrice').text();
    var itemCategory = $('#wishlistSelectedCategory').text();
    var itemDescription = $('#wishlistSelectedDesc').text();
    var itemLat = $('#wishlistSelectedLat').text();
    var itemLong = $('#wishlistSelectedLong').text();
    
    //Create object for editing
    var editItem = {id:itemId, name:itemName, price:itemPrice, category:itemCategory, desc:itemDescription, lat:itemLat, long:itemLong};
    
    //Save to local storage
    localStorage.setItem("editItemValues", JSON.stringify(editItem));
    
    //go to edit page
    window.location = "#editWishlistItemForm";
    
    
    
}


function editImg() {
    
    //Get ID
    var itemId = $('wishlist-item-details').attr('id');
    //Get image source
    var imgSrc = $('#wishlistSelectedImg').attr("src");
    
    //create new object with information
    var editImg = {id:itemId, src:imgSrc};
    
    
    //send to local storage
    localStorage.setItem("editImg", JSON.stringify(editImg));
    
    //go to edit page
    window.location = "#editWishlistImgForm";
}


function updateInfo() {
    
    //get object Id
    var itemObjectId = new String();
    itemObjectId = localStorage.getItem("wishlistItemId");
    
    //Get all inputs (hardcoded for now)
    var update = {
        objectId:itemObjectId,
        wishlist_item_name:"testWishlist"
    }
    
    
    Backendless.Data.of("WishList_Items").save(update).then(updateItem).catch(error);
    
    function updateItem(updatedObject) {
        
        console.log("updated")
    
    };
    
    
}

//on delete
function deleteItem() {
    
    //callback function for dialog box
    function alertCallback(buttonIndex) {
        
        //check if confirmed
        if(buttonIndex == 1) {
            
            //get item ID of wishlist item

            var itemObjectId = localStorage.getItem("wishlistItemId");

            //add to object

            var deleteItem = {

                objectId:itemObjectId

            }

            //send over object to be deleted via backendless query

            Backendless.Data.of("WishList_Items").remove(deleteItem).then(deleteConfirm).catch(error);

            function deleteConfirm(timestamp){
                console.log("item deleted at: " +timestamp);
                
                //show a toast saying the item has been successfully deleted
                window.plugins.toast.showShortBottom("Item Deleted Successfully");
                //return to wishlist items
                window.location.replace("#wishlist-items");
            }
            
        } else {
            
            //if user doesn't delete return to page
            console.log("cancel");
            
        }
        
        
    }
    
    //popup dialog box to confirm delete
    navigator.notification.confirm(
    "Are you sure you want to delete this item?",
    alertCallback,
    "Delete Confirm",
    ["Confirm", "Cancel"]    
    );

   
}

function showLocation() {
    
    window.location = "#viewWishlistLocation";
    
}