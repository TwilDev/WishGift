$(document).ready(function(){

//back button on account - redirect to wishlist page
$('#returnHome').click(function(){
    
    window.location.replace("#home");
});

//return to wishlists from wishlist items
$('#wishlistItemsBack').click(function(){
    
   window.location.replace("#wishlist"); 
    
});

//Return to wishlist items from add form
$('#addWishlistItemFormBack').click(function(){
    
   window.location.replace("#wishlist-items");
    
});

//Return to wishlist list from wishlist form
$('#wishlistFormBack').click(function(){
    
   window.location.replace("#wishlist"); 
    
});
    
//Return to wishlist items from details page
$('#wishlistItemBack').click(function(){
    
   window.location.replace("#wishlist-items");
    
});

//Return to account page from edit details
$('.return-to-account').click(function(){
    
   window.location.replace("#account");
    
});

//Return to items from edit form
$('#editWishlistBack').click(function(){
    
   window.location.replace("#wishlist-items");
    
});
    
$('#editWishlistImgBack').click(function(){
    
    window.location.replace("#wishlist-items");
});


//Click in user icon redirect
$('.user-icon').click(function(){
    
    window.location.replace("#account");
    
});
    
    
    
});

//standard back button return - Was used but caused some issues
/*
$('.back-arrow').click(function(){
    window.history.back();
    
});*/
