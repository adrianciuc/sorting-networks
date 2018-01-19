var saveSortingNetwork = function(event) {
    console.log("Saving sorting network: " + sortingNetworkInCreationProcess);
    showLoadingSpiner();
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved)
};

var saveEditedSortingNetwork = function() {
    console.log("Saving edited sorting network: " + sortingNetworkInCreationProcess);
    showLoadingSpiner();
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.SaveEditedSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkSaved);
};

var sortingNetworkSaved = function() {
    location.reload(true);
};

var checkSortingNetwork = function() {
    console.log("Checking sorting network");
    showLoadingSpiner();
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.CheckSortingNetwork(sortingNetworkInCreationProcess, csrfTokenName, csrfTokenValue, sortingNetworkChecked);

};

var sortingNetworkChecked = function (unsortedInput) {
    removeLoadingSpiner();
    if (unsortedInput.length === 0) {
        $("#unsorted-input").html("<span class='top-number'>Sorts everything !!!</span>");
    } else {
        console.log("Network can not sort this input: ");
        var toBeShown;
        if (unsortedInput.length > 100000) {
            toBeShown = 20;
        } else {
            toBeShown = unsortedInput.length;
        }
        //TODO: Increase performance here
        var unsortedInputAsHtml = "<p>" +
                "<span class='sn-property-value'>" +
                    unsortedInput.length +
                "</span> " +
                "<span class='top-username'>" +
                    " unsorted entries. First "+
                    "<span class='sn-property-value' style='color: white'>" +
                        toBeShown +
                    "</span>" +
                    " are:" +
                "</span>" +
            "</p>" +
            "<p id=\"unsorted-input-text\">" +
                unsortedInput.join("] - [") +
            "</p>";
        document.getElementById('unsorted-input').innerHTML = unsortedInputAsHtml;
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

var showLoadingSpiner = function() {
    $("<div id='woohoo' class='app-spinner-container'>" +
        "<i class=\"fa fa-circle-o-notch fa-spin app-spinner\"></i></div>")
        .appendTo($("#new-sn-network").css("position", "relative"));
};

var removeLoadingSpiner = function() {
    $("#woohoo").remove();
};