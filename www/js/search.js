//Only on document prepare
$(document).ready(function(){

//On click search icon
$('#wishlistSearchIcon').on("click", function(){
   
    console.log("click");
    //toggle searchbar
    $('#wishlistSearchContainer').toggle();
    
});
    
//On typing into search box
$('#wishlistSearch').on("keyup", function(){
    
    //get inpit value
    var searchInput = $(this).val().toLocaleLowerCase();
    //filter everytghing within list 
    $('#wishListLists *').filter(function(){
        
        //toggle item if not matching
        $(this).toggle($(this).text().toLowerCase().indexOf(searchInput) > -1)
        
    });
    
});

//on click search icon
$('#wishlistItemsSearchIcon').on("click", function(){
    
    //toggle searchbar
    $('#wishlistItemSearchContainer').toggle();
});

//On typing into search box
$('#wishlistItemSearch').on("keyup", function(){
   
    //get input value
    var searchInput = $(this).val().toLocaleLowerCase();
    
    //filter divs containing item informaiton
    $('#testingWishlistItems div').filter(function(){
        
        //toggle if not matching
        $(this).toggle($(this).text().toLowerCase().indexOf(searchInput) > -1)
        
    });
    
});
    
});