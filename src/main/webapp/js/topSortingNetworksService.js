TopSortingNetworkService = function(sortingNetworkListContainerId, pillsContainerId, renderSortingNetworkRankAndOwner) {

    var tsnSelf = {};

    tsnSelf.sortingNetworkListContainerId = sortingNetworkListContainerId;
    tsnSelf.pillsContainerId = pillsContainerId;
    tsnSelf.renderSortingNetworkRankAndOwner = renderSortingNetworkRankAndOwner;

    tsnSelf.renderNetworkUserName = function (network, index) {
        return renderSortingNetworkRankAndOwner ?
            "<div class=\"network-username col-lg-offset-2\">" +
            "<span class=\"top-number\">#" + (index + 1) + "</span>" +
            " by: " +
            "<span class=\"top-username\">" + network.user.firstName + " " + network.user.lastName + "</span>" +
            "</div>"
            :
            "";
    };

    tsnSelf.renderNetworkContainer = function (network, index, sorting_network_container_name, networksGroupContainerId) {
        $("#" + networksGroupContainerId)
            .append(
                "<div id=\"" + sorting_network_container_name + "\" class=\"row\">" + tsnSelf.renderNetworkUserName(network, index) + "</div>");
    };

    tsnSelf.renderOneTopNetwork = function (network, index, numberOfWires, networksGroupContainerId) {
        var sorting_network_container_name = "sorting-network-top-number-" + numberOfWires + index;
        tsnSelf.renderNetworkContainer(network, index, sorting_network_container_name, networksGroupContainerId);
        sortingNetworkToRender = network;
        new p5(sortingNetworkP5Canvas, document.getElementById(sorting_network_container_name));
    };

    tsnSelf.renderBootstrapPillAndContainerForGroupOfNetworks = function (networksGroupContainerId, numberOfWires) {
        $(tsnSelf.pillsContainerId)
            .append("<li><a data-toggle=\"pill\" href=\"#" + networksGroupContainerId + "\">" + numberOfWires + " wires" + "</a></li>");
        $(tsnSelf.sortingNetworkListContainerId)
            .append("<div id=\"" + networksGroupContainerId + "\" class=\"tab-pane fade\"></div>");
    };

    tsnSelf.stackAllComparators = function (total, parallelComparators, index) {
        if (index == 1) {
            return total.comparators.length + parallelComparators.comparators.length;
        } else {
            return total + parallelComparators.comparators.length;
        }
    };

    tsnSelf.sortNetworksByNumberOfComparators = function (networks) {
        networks.sort(function (first, second) {
            var firstNumberOfComparators = first.parallelComparators.reduce(tsnSelf.stackAllComparators);
            var secondNumberOfComparators = second.parallelComparators.reduce(tsnSelf.stackAllComparators);
            return secondNumberOfComparators - firstNumberOfComparators;
        });
    };

    tsnSelf.renderGroupOfNetworks = function (numberOfWires, networks) {
        console.log("Rendering networks with " + numberOfWires + " wires");
        var networksGroupContainerId = numberOfWires + "_wire_group" + tsnSelf.sortingNetworkListContainerId.substr(1);
        tsnSelf.renderBootstrapPillAndContainerForGroupOfNetworks(networksGroupContainerId, numberOfWires);
        tsnSelf.sortNetworksByNumberOfComparators(networks);
        networks.forEach(function (network, index) {
            tsnSelf.renderOneTopNetwork(network, index, numberOfWires, networksGroupContainerId);
        });
    };

    tsnSelf.splitByNumberOfWires = function (networks) {
        var split = {};
        networks.forEach(function (network) {
            split[network.numberOfWires] = split[network.numberOfWires] || [];
            split[network.numberOfWires].push(network);
        });
        return split;
    };

    tsnSelf.makeFirstGroupActive = function () {
        $(tsnSelf.sortingNetworkListContainerId).children(":first").addClass("in active");
        $(tsnSelf.pillsContainerId).children(":first").addClass("active");
    };

    tsnSelf.renderTopOfSortingNetworks = function (networks) {
        console.log("Rendering top of sorting networks");
        var split = tsnSelf.splitByNumberOfWires(networks);
        for (var numberOfWires in split) {
            tsnSelf.renderGroupOfNetworks(numberOfWires, split[numberOfWires]);
        }
        tsnSelf.makeFirstGroupActive();
    };

    return tsnSelf;
};