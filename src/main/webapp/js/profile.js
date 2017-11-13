var renderOneNetwork = function(network, index) {
    var sorting_network_container_name = "sorting-network-top-number-" + index;
    $("#user-sn-list").append("<div id=\"" + sorting_network_container_name + "\" class=\"row\"></div></div>");
    sortingNetworkToRender = network;
    new p5(sortingNetworkP5Canvas, document.getElementById(sorting_network_container_name));
};

var renderLoggedInUserSortingNetworks = function(networks) {
    console.log("Rendering all sorting networks for current logged in user");
    networks.forEach(renderOneNetwork)
};

var getUserSortingNetworks = function() {
    console.log("Fetching server for current logged in user sorting networks");
    SortingNetworkService.GetAllForLoggedInUser(renderLoggedInUserSortingNetworks);
};

$(document).ready(function(){
    initNavBar();
    getUserSortingNetworks()
});

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}