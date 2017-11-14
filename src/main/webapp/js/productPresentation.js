var renderNetworkUserName = function(network, index, sorting_network_container_name) {
    var userName = network.user.firstName + " " + network.user.lastName;
    $("#top-list")
        .append(
            "<div id=\"" + sorting_network_container_name + "\" class=\"row\">" +
                "<div class=\"network-username col-lg-offset-2\">" +
                    "<span class=\"top-number\">#" + (index + 1) + "</span>" +
                    " by: " +
                    "<span class=\"top-username\">" + userName + "</span>" +
                "</div>" +
            "</div>");
};

var renderOneNetwork = function(network, index) {
    var sorting_network_container_name = "sorting-network-top-number-" + index;
    renderNetworkUserName(network, index, sorting_network_container_name);
    sortingNetworkToRender = network;
    new p5(sortingNetworkP5Canvas, document.getElementById(sorting_network_container_name));
};

var renderTopOfSortingNetworks = function(networks) {
    console.log("Rendering top of sorting networks");
    networks.forEach(renderOneNetwork)
};

var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    // TODO: Use getTop here instead of getAll in order to have top of sorting networks
    SortingNetworkService.GetAll(renderTopOfSortingNetworks);
};

$(document).ready(addTopOfSortingNetworks);

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}
