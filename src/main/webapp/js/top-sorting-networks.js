var renderNetworkUserName = function(network, index, renderSNOwner) {
    return renderSNOwner ?
        "<div class=\"network-username col-lg-offset-2\">" +
            "<span class=\"top-number\">#" + (index + 1) + "</span>" +
            " by: " +
            "<span class=\"top-username\">" + network.user.firstName + " " + network.user.lastName + "</span>" +
        "</div>"
        :
        "";
};

var renderNetworkContainer = function(network, index, sorting_network_container_name, networksGroupContainerId, renderSNOwner) {
    $("#" + networksGroupContainerId)
        .append(
            "<div id=\"" + sorting_network_container_name + "\" class=\"row\">" + renderNetworkUserName(network, index, renderSNOwner) +"</div>");
};

var renderOneTopNetwork = function(network, index, numberOfWires, networksGroupContainerId, renderSNOwner) {
    var sorting_network_container_name = "sorting-network-top-number-" + numberOfWires + index;
    renderNetworkContainer(network, index, sorting_network_container_name, networksGroupContainerId, renderSNOwner);
    sortingNetworkToRender = network;
    new p5(sortingNetworkP5Canvas, document.getElementById(sorting_network_container_name));
};

var renderBootstrapPillAndContainerForGroupOfNetworks = function(networksGroupContainerId, numberOfWires, snList, snPillList) {
    $(snPillList)
        .append("<li><a data-toggle=\"pill\" href=\"#"+ networksGroupContainerId +"\">" + numberOfWires + " wires" + "</a></li>");
    $(snList)
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

var renderGroupOfNetworks = function(numberOfWires, networks, snList, snPillList, renderSNOwner) {
    console.log("Rendering networks with "+ numberOfWires +" wires");
    var networksGroupContainerId = numberOfWires + "_wire_group" + snList.substr(1);
    renderBootstrapPillAndContainerForGroupOfNetworks(networksGroupContainerId, numberOfWires, snList, snPillList);
    sortNetworksByNumberOfComparators(networks);
    networks.forEach(function (network, index) {
        renderOneTopNetwork(network, index, numberOfWires, networksGroupContainerId, renderSNOwner);
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

var makeFirstGroupActive = function(snList, snPillList) {
    $(snList).children(":first").addClass("in active");
    $(snPillList).children(":first").addClass("active");
};

var renderTopOfSortingNetworks = function(networks, snList, snPillList, renderSNOwner) {
    console.log("Rendering top of sorting networks");
    var split = splitByNumberOfWires(networks);
    for (var numberOfWires in split) {
        renderGroupOfNetworks(numberOfWires, split[numberOfWires], snList, snPillList, renderSNOwner);
    }
    makeFirstGroupActive(snList, snPillList);
};

// This function specify that P5 library should not create a default canvas
function setup() {
    noCanvas();
}
