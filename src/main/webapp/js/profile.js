var addUserSortingNetworks = function() {
    console.log("Fetching server for current logged in user sorting networks");
    SortingNetworkService.GetAllForLoggedInUser(renderTopOfSortingNetworks, "#user-sn-list", "#user-sn-pills-list", false);
};

var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    //TODO: Use Get All Finished Networks instead of getting all networks
    SortingNetworkService.GetAll(renderTopOfSortingNetworks,"#top-sn-list", "#top-sn-pills-list", true);
};

$(document).ready(function(){
    initNavBar();
    addTopOfSortingNetworks();
    addUserSortingNetworks();
});

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}