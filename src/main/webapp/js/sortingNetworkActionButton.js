var saveSortingNetwork = function(event) {
    console.log("Saving sorting network: " + sortingNetworkInCreationProcess);
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved)
};

var sortingNetworkSaved = function() {
    location.reload(true);
};