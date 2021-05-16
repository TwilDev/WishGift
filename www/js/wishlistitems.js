$(document).on("pageshow","#wishlist-items", onPageShow);

$(document).on("click", ".wishlist-item-container", viewItem);

$(document).on("click", "#addNewWishlistItemBtn", goToForm);

$(document).on("change", "#wishlistItemCategory", filterByCategory);

function error(err) {
    //show err if failed to retrieve
    alert(err); 
}

//on pageshow populate with wishlist items
function onPageShow() {
    
    $('#testingWishlistItems').empty();
    
    //declare string parentObjectId and assign the localStorage item parentId to it
    var parentObjectId = localStorage.getItem("parentId");
    console.log("from local storage " + parentObjectId);
    
    //// ------ GETTING CHILD OBJECTS FROM PARENT ------ ////
    
    // Retrieved from Backendless Documentation https://backendless.com/docs/js/data_relation_paging.html
    
    //Create querybuilder
    var loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create();
    
    //set relationship to the appropriate column
    loadRelationsQueryBuilder.setRelationName( "wishlist_child_items" );
    
    // get items where the relationship with the parent table has an ID of the wishlist retrivedxs
    Backendless.Data.of( "Wishlist" ).loadRelations( 
                                parentObjectId,
                                loadRelationsQueryBuilder )
     .then( function( relatedObjectsArray ) {
        
        
        
        for (var i=0; i < relatedObjectsArray.length; i++) {
            //loop through results and append to list giving each container the object ID to be passed on
            
            $('#testingWishlistItems').append("<div class='wishlist-item-container' name='"+relatedObjectsArray[i].wishlist_item_category+"' id='"+relatedObjectsArray[i].objectId+"'><img class='image-container' src="+relatedObjectsArray[i].wishlist_item_image_path+"><div class='test-float'><h3 class='wishlist-item-title'>"+relatedObjectsArray[i].wishlist_item_name+"</h3><h3 class='price-container'>£</h3><h3 class='wishlist-item-price'>"+relatedObjectsArray[i].wishlist_item_price+"</h3></div><input type='hidden' class='wishlist-item-desc' value='"+relatedObjectsArray[i].wishlist_item_description+"'><input type='hidden' id='latHidden' name='"+relatedObjectsArray[i].wishlist_item_lat+"'><input type='hidden' id='longHidden' name='"+relatedObjectsArray[i].wishlist_item_long+"'></div>");
            
            
        }
        //refresh wishlist
        $('#testingWishlistItems').listview('refresh');
      })
     .catch( function( error ) {
      });
    
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
             $('#wishlistItemCategory').append(
                "<option value='"+options[i].option_name+"'>"+options[i].option_name+"</option>"
             )

        }
    };
    
}

//On clickign item navigate to new page to show all details
function viewItem() {
        
    //Declare a new string parentId
    var wishlistItemId = new String();
    //assign the clicked wishlist id to the parentId
    wishlistItemId = $(this).attr('id');
    console.log(wishlistItemId);
    
    //Get values for all items selected
    
    var itemPrice = $(this).find(".wishlist-item-price").text();
    
    var itemName = $(this).find(".wishlist-item-title").text();
    
    var itemCategory = $(this).closest(".wishlist-item-container").attr("name");
    
    var itemDescription = $(this).find(".wishlist-item-desc").val();
    
    var itemImageSource = $(this).find(".image-container").attr("src");
    
    var itemLat = $(this).find("#latHidden").attr("name");
    
    var itemLong = $(this).find("#longHidden").attr("name");
    
    console.log("this is name " +itemName);
    console.log("this is price " +itemPrice);
    console.log("this is the desc " +itemDescription);
    console.log("this is the image source " +itemImageSource);
    
    //add items to JS object in key value pairs
    var wishlistItem = {id:wishlistItemId, name:itemName, price:itemPrice, category:itemCategory, desc:itemDescription, img:itemImageSource, lat:itemLat, long:itemLong};
    
    //set item to local storage as a stringified object
    localStorage.setItem('wishlistSelectedItem', JSON.stringify(wishlistItem));
    
    //store the parentId in localstorage
    localStorage.setItem('wishlistItemId', wishlistItemId);

    
    //goto wishlist items page
    window.location = "#wishlist-item-details";
}

function goToForm() {
    
    
    window.location = "#addWishlistItemForm";
    
}

function filterByCategory() {
    
    //get current filter
    var selectedFilter = $('#wishlistItemCategory option:selected').val();
    console.log(selectedFilter);
    
    //Iterate through each item and toggle visibiltiy by filter
    $('.wishlist-item-container').each(function(){
        
       if($(this).attr("name") != selectedFilter) {
           
           $(this).hide();
           
       } else {
           
           $(this).show();
       }
        
    });
    
}