TopSortingNetworkService = function(sortingNetworkListContainerId, pillsContainerId, renderSortingNetworkRankAndOwner, renderEndedAction, renderContextMenuPlaceholderToggle, displayNothingIfEmpty) {

    var tsnSelf = {};

    tsnSelf.sortingNetworkListContainerId = sortingNetworkListContainerId;
    tsnSelf.pillsContainerId = pillsContainerId;
    tsnSelf.renderSortingNetworkRankAndOwner = renderSortingNetworkRankAndOwner;
    tsnSelf.renderContextMenuPlaceholderToggle = renderContextMenuPlaceholderToggle;
    tsnSelf.renderEndedAction = renderEndedAction;
    tsnSelf.displayNothingIfEmpty = displayNothingIfEmpty;

    tsnSelf.renderNetworkProperties = function(network){
        var elementClass = "";
        if (renderSortingNetworkRankAndOwner) {
            elementClass = " class=\"row\"";
        }
        return "<div id=\"sn-properties-" + network.id + "\" "+ elementClass + "></div>";
    };

    tsnSelf.renderNetworkUserName = function (network, index) {
        return tsnSelf.renderSortingNetworkRankAndOwner ?
            "<div class=\"network-username col-lg-offset-2\">" +
            "<span class=\"top-number\">#" + (index + 1) + "</span>" +
            " by: " +
            "<span class=\"top-username\">" + network.user.firstName + " " + network.user.lastName + "</span>" +
            "</div>"
            :
            "";
    };

    tsnSelf.renderContextMenuPlaceholder = function() {
        return tsnSelf.renderContextMenuPlaceholderToggle ?
            "<div class= \"row context-menu\">" +
            "       <ul class=\"nav navbar-nav\">" +
            "           <li class=\"dropdown disabled \">" +
            "               <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
            "                   <div class=\"context-menu-placeholder\"></div>" + "" +
            "               </a>" +
            "           </li>" +
            "       </ul>" +
            "   </div>\n"
            :
            "";
    };

    tsnSelf.renderNetworkContainer = function (network, index, sorting_network_container_name, networksGroupContainerId) {
        $("#" + networksGroupContainerId)
            .append(
                "<div id=\"" + sorting_network_container_name + "\" class=\"row\">"
                + tsnSelf.renderNetworkUserName(network, index)
                + tsnSelf.renderContextMenuPlaceholder()
                + tsnSelf.renderNetworkProperties(network)
                + "</div>");
    };

    tsnSelf.renderOneTopNetwork = function (network, index, numberOfWires, networksGroupContainerId) {
        var sorting_network_container_name = "sorting-network-top-number-" + numberOfWires + index + networksGroupContainerId;
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
        if (index === 1) {
            return total.comparators.length + parallelComparators.comparators.length;
        } else {
            return total + parallelComparators.comparators.length;
        }
    };

    tsnSelf.sortNetworksByNumberOfComparators = function (networks) {
        networks.sort(function (first, second) {
            var firstNumberOfComparators = 0;
            var secondNumberOfComparators = 0;
            if (first.parallelComparators.length !== 0) {
                firstNumberOfComparators = first.parallelComparators.reduce(tsnSelf.stackAllComparators);
            }
            if (second.parallelComparators.length !== 0) {
                secondNumberOfComparators = second.parallelComparators.reduce(tsnSelf.stackAllComparators);
            }
            firstNumberOfComparators =
                firstNumberOfComparators.comparators ?
                    firstNumberOfComparators.comparators.length :
                    firstNumberOfComparators;
            secondNumberOfComparators =
                secondNumberOfComparators.comparators ?
                    secondNumberOfComparators.comparators.length :
                    secondNumberOfComparators;
            return firstNumberOfComparators - secondNumberOfComparators;
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

    tsnSelf.displayWelcomeMessages = function () {
        if (tsnSelf.displayNothingIfEmpty){
            $("#top-content").remove();
            $("#top-name").remove();
        } else {
            var noSNText;
            var buttonId = "create-first-sn";
            if (tsnSelf.renderSortingNetworkRankAndOwner) {
                noSNText = "No one created a sorting network. Be the first one !";
                buttonId = buttonId + "-mn";
            } else {
                noSNText = "You have no sorting networks";
                buttonId = buttonId + "tn";
            }
            $(tsnSelf.sortingNetworkListContainerId).html(
                "<div class='row'>" +
                "<span class='row no-network-text'>" + noSNText + "</span>" +
                "<button id=\"" + buttonId + "\" type=\"button\" class=\"btn btn-dark row\">" +
                "Create Network" +
                "</button>" +
                "</div>");
            $("#" + buttonId).attr("onclick", "showCreationPage(event)")
        }
    };

    tsnSelf.renderTopOfSortingNetworks = function (networks) {
        console.log("Rendering top of sorting networks");
        if (networks.length === 0) {
            tsnSelf.displayWelcomeMessages();
        } else {
            var split = tsnSelf.splitByNumberOfWires(networks);
            for (var numberOfWires in split) {
                tsnSelf.renderGroupOfNetworks(numberOfWires, split[numberOfWires]);
            }
            tsnSelf.makeFirstGroupActive();
            if (tsnSelf.renderEndedAction) {
                renderEndedAction(networks, tsnSelf.sortingNetworkListContainerId);
            }
        }
    };

    return tsnSelf;
};

var showCreationPage = function (event) {
    event.preventDefault();
    $("#new-sn-network-tab").tab('show').focus();
};