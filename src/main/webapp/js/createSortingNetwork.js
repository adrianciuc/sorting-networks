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
            "<button id=\"save-sn-btn\" type=\"button\" class=\"btn btn-dark\">Save</button>" +
        "</div>" +
        "<div id=\"" + snContainerId + "\" class=\"row\">" +
        "</div>");
    sortingNetworkToRender = {
        "numberOfWires": numberOfWires,
        "id": null,
        "user": null,
        "parallelComparators": []
    };
    editableCanvasForSortingNetwork = true;
    new p5(sortingNetworkP5Canvas, document.getElementById(snContainerId));
    editableCanvasForSortingNetwork = false;
    $("#save-sn-btn").attr("onclick", "saveSortingNetwork(event)")
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