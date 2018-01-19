var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    var topSortingNetworkService = TopSortingNetworkService("#top-sn-list", "#top-sn-pills-list", true, null, false, true);
    SortingNetworkService.GetAllFinished(topSortingNetworkService.renderTopOfSortingNetworks);
};

$(document).ready(addTopOfSortingNetworks);
