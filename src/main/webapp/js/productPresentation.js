var addTopOfSortingNetworks = function() {
    console.log("Fetching server for sorting networks");
    //TODO: Use Get All Finished Networks instead of getting all networks
    SortingNetworkService.GetAll(renderTopOfSortingNetworks,"#top-sn-list", "#top-sn-pills-list", true);
};

$(document).ready(addTopOfSortingNetworks);
