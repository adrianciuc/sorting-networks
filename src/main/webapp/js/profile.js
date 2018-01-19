var addUserSortingNetworks = function() {
    console.log("Fetching server for current logged in user sorting networks");
    var topSortingNetworkService = TopSortingNetworkService("#user-sn-list", "#user-sn-pills-list", false, addContextMenu, true, false);
    SortingNetworkService.GetAllForLoggedInUser(topSortingNetworkService.renderTopOfSortingNetworks);
};

var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    var topSortingNetworkService = TopSortingNetworkService("#top-sn-list", "#top-sn-pills-list", true, null, false, false);
    SortingNetworkService.GetAllFinished(topSortingNetworkService.renderTopOfSortingNetworks);
};

var fadeOutEmptyFadeIn = function() {
    $(this).empty();
    $(this).fadeIn();
};

var refreshUserSortingNetwork = function() {
    $("#user-sn-pills-list").fadeOut(300, fadeOutEmptyFadeIn);
    $("#user-sn-list").fadeOut(500, function() {
        $(this).empty();
        addUserSortingNetworks();
        $(this).fadeIn();
    });
};

var refreshTopOfSortingNetwork = function() {
    $("#top-sn-pills-list").fadeOut(300, fadeOutEmptyFadeIn);
    $("#top-sn-list").fadeOut(500, function() {
        $(this).empty();
        addTopOfSortingNetworks();
        $(this).fadeIn();
    });
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