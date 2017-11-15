var renderNetworkUserName = function(network, index, sorting_network_container_name, networksGroupContainerId) {
    var userName = network.user.firstName + " " + network.user.lastName;
    $("#" + networksGroupContainerId)
        .append(
            "<div id=\"" + sorting_network_container_name + "\" class=\"row\">" +
                "<div class=\"network-username col-lg-offset-2\">" +
                    "<span class=\"top-number\">#" + (index + 1) + "</span>" +
                    " by: " +
                    "<span class=\"top-username\">" + userName + "</span>" +
                "</div>" +
            "</div>");
};

var renderOneNetwork = function(network, index, numberOfWires, networksGroupContainerId) {
    var sorting_network_container_name = "sorting-network-top-number-" + numberOfWires + index;
    renderNetworkUserName(network, index, sorting_network_container_name, networksGroupContainerId);
    sortingNetworkToRender = network;
    new p5(sortingNetworkP5Canvas, document.getElementById(sorting_network_container_name));
};

var renderBootstrapPillAndContainerForGroupOfNetworks = function(networksGroupContainerId, numberOfWires) {
    $("#top-networks-pills-list")
        .append("<li><a data-toggle=\"pill\" href=\"#"+ networksGroupContainerId +"\">" + numberOfWires + " wires" + "</a></li>");
    $("#top-list")
        .append("<div id=\"" + networksGroupContainerId + "\" class=\"tab-pane fade\"></div>");
};

var stackAllComparators = function (total, parallelComparators, index){
    if (index == 1){
        return total.comparators.length + parallelComparators.comparators.length;
    } else {
        return total + parallelComparators.comparators.length;
    }
};

var sortNetworksByNumberOfComparators = function(networks) {
    networks.sort(function(first, second) {
        var firstNumberOfComparators = first.parallelComparators.reduce(stackAllComparators);
        var secondNumberOfComparators = second.parallelComparators.reduce(stackAllComparators);
        return secondNumberOfComparators - firstNumberOfComparators;
    });
};

var renderGroupOfNetworks = function(numberOfWires, networks) {
    console.log("Rendering networks with "+ numberOfWires +" wires");
    var networksGroupContainerId = numberOfWires + "_wire_group";
    renderBootstrapPillAndContainerForGroupOfNetworks(networksGroupContainerId, numberOfWires);
    sortNetworksByNumberOfComparators(networks);
    networks.forEach(function (network, index) {
        renderOneNetwork(network, index, numberOfWires, networksGroupContainerId);
    });
};

var splitByNumberOfWires = function(networks) {
    var split = {};
    networks.forEach(function(network) {
        split[network.numberOfWires] = split[network.numberOfWires] || [];
        split[network.numberOfWires].push(network);
    });
    return split;
};

var makeFirstGroupActive = function() {
    $("#top-list").children(":first").addClass("in active");
    $("#top-networks-pills-list").children(":first").addClass("active");
};

var renderTopOfSortingNetworks = function(networks) {
    console.log("Rendering top of sorting networks");
    var split = splitByNumberOfWires(networks);
    for (var numberOfWires in split) {
        renderGroupOfNetworks(numberOfWires, split[numberOfWires]);
    }
    makeFirstGroupActive();
};

var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    //TODO: Use Get All Finished Networks instead of getting all networks
    SortingNetworkService.GetAll(renderTopOfSortingNetworks);
};

$(document).ready(addTopOfSortingNetworks);

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}
