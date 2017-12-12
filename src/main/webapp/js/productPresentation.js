var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    //TODO: Use Get All Finished Networks instead of getting all networks
    var topSortingNetworkService = TopSortingNetworkService("#top-sn-list", "#top-sn-pills-list", true, null, false);
    SortingNetworkService.GetAll(topSortingNetworkService.renderTopOfSortingNetworks);
};

$(document).ready(addTopOfSortingNetworks);
