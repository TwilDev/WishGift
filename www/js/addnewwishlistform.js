$(document).on("pageshow","#addWishlistForm", onPageShow);

$(document).on("click", "#addWishlistButton", addNewWishlist);

function onPageShow(){
  console.log("testform");  
};

function addNewWishlist() {
    

    
    //data binding
    var wishlistName = $('#addWishlistName').val();
    console.log(wishlistName);
    
    
      var wishListArr = {
        wishlist_name:wishlistName
    }
      
    console.log(wishListArr);
    
    
    //declare added object as array
    var addedObject = [];
    
    //save wishlist 
    Backendless.Data.of("Wishlist").save(wishListArr).then(function (savedObject) {
        
        console.log("object Saved" + savedObject.objectId);
        
        //push new objectId to addedObject Array
        addedObject.push(savedObject.objectId);
        
        console.log(addedObject);   
        
        //Show a toast for adding new item
        window.plugins.toast.showShortBottom("Wishlist Added Successfully");
        //return to main page
        window.location.replace("#wishlist");
        
    })
    .catch (function (error){
       console.log(error.message); 
    });
}