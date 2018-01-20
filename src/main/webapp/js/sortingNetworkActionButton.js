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

var renderUnsortedInputP = function (unsortedInput, toBeShown) {
    var unsortedInputAsHtmlPrefix = document.createElement("p");
    var inputLengthSpan = document.createElement("span");
    inputLengthSpan.classList.add('sn-property-value');
    inputLengthSpan.appendChild(document.createTextNode(unsortedInput.length));
    unsortedInputAsHtmlPrefix.appendChild(inputLengthSpan);

    if (toBeShown) {

        var prefixTextSpan = document.createElement("span");
        prefixTextSpan.classList.add('top-username');
        prefixTextSpan.appendChild(document.createTextNode(" unsorted entries. First "));
        unsortedInputAsHtmlPrefix.appendChild(prefixTextSpan);

        var toBeShownContainer = document.createElement("span");
        toBeShownContainer.classList.add("sn-property-value");
        toBeShownContainer.appendChild(document.createTextNode(toBeShown));
        unsortedInputAsHtmlPrefix.appendChild(toBeShownContainer);

        var toBeShownContainerSuffix = document.createElement("span");
        toBeShownContainerSuffix.classList.add('top-username');
        toBeShownContainerSuffix.appendChild(document.createTextNode(" are: "));
        unsortedInputAsHtmlPrefix.appendChild(toBeShownContainerSuffix);

        unsortedInput = unsortedInput.slice(0, toBeShown);

    } else {

        var prefixTextSpanShort = document.createElement("span");
        prefixTextSpanShort.classList.add('top-username');
        prefixTextSpanShort.appendChild(document.createTextNode(" unsorted entries: "));
        unsortedInputAsHtmlPrefix.appendChild(prefixTextSpanShort);

    }

    var unsortedInputAsHtmlSuffix = document.createElement("p");
    unsortedInputAsHtmlSuffix.setAttribute("id", "unsorted-input-text");
    unsortedInputAsHtmlSuffix.appendChild(document.createTextNode( "["+ unsortedInput.join("] - [") + "]"));


    var container = document.getElementById('unsorted-input');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(unsortedInputAsHtmlPrefix);
    container.appendChild(unsortedInputAsHtmlSuffix);
};

var sortingNetworkChecked = function (unsortedInput) {
    var start = Date.now();
    removeLoadingSpiner();
    sortingNetworkInCreationProcess.unsortedInput = JSON.parse(JSON.stringify(unsortedInput));
    if (unsortedInput.length === 0) {
        $("#unsorted-input").html("<span class='top-number'>Sorts everything !!!</span>");
    } else {
        console.log("Network can not sort this input: ");
        var toBeShown;
        if (unsortedInput.length >= 100) {
            toBeShown = 100;
        }
        //TODO: Increase performance here
        renderUnsortedInputP(unsortedInput, toBeShown);
        console.log(Date.now() - start);
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