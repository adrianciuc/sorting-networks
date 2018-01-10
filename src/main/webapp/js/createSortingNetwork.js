var displayErrorMesssage = function (errorMessageTag) {
    errorMessageTag.html("" +
        "<ul class=\"list-unstyled\">" +
        "   <li style=\"color:#a94442\">" +
        "       Invalid number. It should be an integer between 2 and 1000" +
        "   </li>" +
        "</ul>");
};

var renderNetworkCanvas = function() {
    var element = $(this);
    var numberOfWires = parseInt($("#sn-wire-number").val());
    element.empty();
    var snContainerId = "new-sn-network-container";
    element.html(
        "<div id=\"create-sn-btn-container\" class=\"row\">" +
            "<button id=\"undo-sn-btn\" type=\"button\" class=\"btn btn-dark\">" +
                "<i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Undo" +
            "</button>" +
            "<button id=\"redo-sn-btn\" type=\"button\" class=\"btn btn-dark\">" +
                "<i class=\"fa fa-repeat\" aria-hidden=\"true\"></i> Redo" +
            "</button>" +
            "<button id=\"save-sn-btn\" type=\"button\" class=\"btn btn-dark\">" +
                "<i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save" +
            "</button>" +
        "</div>" +
        "<div id=\"" + snContainerId + "\" class=\"row\">" +
        "</div>");
    sortingNetworkToRender = {
        "numberOfWires": numberOfWires,
        "id": null,
        "user": null,
        "parallelComparators": []
    };
    sortingNetworkStates = [];
    editableCanvasForSortingNetwork = true;
    new p5(sortingNetworkP5Canvas, document.getElementById(snContainerId));
    editableCanvasForSortingNetwork = false;
    $("#" + snContainerId + " canvas").attr("oncontextmenu", "return false;");
    $("#save-sn-btn").attr("onclick", "saveSortingNetwork(event)");
    $("#undo-sn-btn").attr("onclick", "undoAction(event)").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
    $("#redo-sn-btn").attr("onclick", "redoAction(event)").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
    element.fadeIn();
};

var createSNButtonClicked = function(event) {
    event.preventDefault();
    var errorMessageTag = $("#sn-wire-number-error");
    errorMessageTag.empty();
    var snNumberOfWires = $("#sn-wire-number").val();
    if (snNumberOfWires < 2 || snNumberOfWires > 1000) {
        displayErrorMesssage(errorMessageTag);
    } else {
        $("#new-sn-network").fadeOut(300, renderNetworkCanvas);
    }
};

$(document).ready(function(){
    $("#create-network-button").attr("onclick", "createSNButtonClicked(event)");
});