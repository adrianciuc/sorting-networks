var saveSortingNetwork = function(event) {
    console.log("Saving sorting network: " + sortingNetworkInCreationProcess);
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved)
};

var saveEditedSortingNetwork = function() {
    console.log("Saving edited sorting network: " + sortingNetworkInCreationProcess);
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveEditedSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved);
};

var sortingNetworkSaved = function() {
    location.reload(true);
};

var checkSortingNetwork = function() {
    console.log("Checking sorting network");
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.CheckSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkChecked);

};

var sortingNetworkChecked = function (unsortedInput) {
    if (unsortedInput.length === 0) {
        console.log("Network can sort every input");
    } else {
        console.log("Network can not sort this input: ");
        console.log(unsortedInput);
    }
};

var undoAction = function(event) {
    console.log("Undo and action");
    if (sortingNetworkStates.length > 1) {
        sortingNetworkStatesUndone.push(sortingNetworkStates.pop());
        $("#redo-sn-btn").attr("aria-disabled", "false").prop("disabled", false).removeClass("disabled");
        sortingNetworkInCreationProcess = JSON.parse(JSON.stringify(sortingNetworkStates.pop()));
        snNeedToBeRedrawn = true;
        if (sortingNetworkStates.length === 0) {
            $("#undo-sn-btn").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
        }
    }
};

var redoAction = function(event) {
    console.log("Redo and action");
    if (sortingNetworkStatesUndone.length > 0) {
        sortingNetworkInCreationProcess = JSON.parse(JSON.stringify(sortingNetworkStatesUndone.pop()));
        snNeedToBeRedrawn = true;
        if (sortingNetworkStatesUndone.length === 0) {
            $("#redo-sn-btn").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
        }
    }
};