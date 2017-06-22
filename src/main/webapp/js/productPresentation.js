var sortingNetworkElement = function(p) {

    p.setup = function () {
        p.createCanvas(600, 400);
        p.background(255, 0, 200);
    };
};

var renderOneNetwork = function(network, index) {
    var sorting_network_container_name = "sorting-network-top-number-" + index;
    $("#top-list").append("<div id=\"" + sorting_network_container_name + "\" class=\"row\"></div></div>");
    new p5(sortingNetworkElement, document.getElementById(sorting_network_container_name));
};

var renderTopOfSortingNetworks = function(networks) {
    console.log("Rendering top of sorting networks");
    networks.forEach(renderOneNetwork)
};

var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    SortingNetworkService.GetAll(renderTopOfSortingNetworks);
};

$(document).ready(addTopOfSortingNetworks);

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}

