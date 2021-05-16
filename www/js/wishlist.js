$(document).on("pageshow","#wishlist", onPageShow);
//event listener for clicking on wishlist
$(document).on("click", ".wishlist-list", viewList);

$(document).on("click", "#addNewWishlistBtn", addWishlistForm);

function error(err) {
    //show err if failed to retrieve
    alert(err);
}

function onPageShow() {
    
    $(document).ready(function(){
        $('.wishlist-list').click(function(e){
            console.log('test');
        });
    });

    //Obtain user ID
    var userId = JSON.parse(localStorage.getItem("userObjectId"));
    //Concat userID into where clause to get their results
    var whereClause = "ownerId = '" +userId+ "'";
    //Create a query builder and set where clause
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    
    //Finds results from tasks, passing through query builder conditional
    Backendless.Data.of("Wishlist").find(queryBuilder).then(processResults).catch(error);
    
    function processResults(wishlists) {
        //empty placeholder tasks
        $('#wishListLists').empty();
        //loop through until no more tasks in DB
        for (var i=0; i < wishlists.length; i++) {
        $('#wishListLists').append("<li><a class='wishlist-list ui-btn 'id="+wishlists[i].objectId+">"+wishlists[i].wishlist_name+"</a></li>");
        }
    }
    //refresh to update
    $('#wishListLists').listview('refresh');

}


function viewList() {
    
    //Declare a new string parentId
    var parentId = new String();
    //assign the clicked wishlist id to the parentId
    parentId = $(this).attr('id');
    
    //store the parentId in localstorage
    localStorage.setItem('parentId', parentId);
    
    //goto wishlist items page
    window.location = "#wishlist-items";
}

function addWishlistForm() {
    
  window.location = "#addWishlistForm"; 
    
}