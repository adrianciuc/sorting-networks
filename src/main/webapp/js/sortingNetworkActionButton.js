var saveSortingNetwork = function(event) {
    console.log("Saving sorting network: " + sortingNetworkInCreationProcess);
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved)
};

var sortingNetworkSaved = function() {
    location.reload(true);
};

var undoAction = function(event) {
    console.log("Undo and action");
    if (sortingNetworkStates.length > 1) {
        sortingNetworkStates.pop();
        sortingNetworkInCreationProcess = JSON.parse(JSON.stringify(sortingNetworkStates.pop()));
        snNeedToBeRedrawn = true;
        if (sortingNetworkStates.length === 0) {
            $("#undo-sn-btn").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
        }
    }
};

var redoAction = function(event) {
    console.log("Redo and action");
};