var contextMenuBegining = "<div class= \"row context-menu\" id=\"";
var contextMenuEnding = "\"><ul\" class=\"nav navbar-nav\">\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a class=\"dropdown-toggle circle-menu\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        <!-- The Profile picture inserted via div class below, with shaping provided by Bootstrap -->\n" +
    "                        <div class=\"dots\"></div>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li><a href=\"#\">Edit</a></li>\n" +
    "                        <li><a id=\"delete-sn\" href=\"#\">Delete</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul></div>";

var getCanvasId = function (e) {
    if ($(e).is("canvas")) {
        return e.id;
    }
    var canvasElement = $(e).find("canvas");
    if (canvasElement.length > 0) {
        return canvasElement.get(0).id;
    } else {
        return getCanvasId($(e).parent());
    }
};

var removeRenderedSortingNetwork = function() {
    refreshUserSortingNetwork();
    refreshTopOfSortingNetwork();
};

var deleteSn = function(event, snId) {
    event.preventDefault();
    console.log("deleting sorting network with id " + snId);
    var csrfTokenName = $("meta[name='_csrf_header']").attr("content");
    var csrfTokenValue = $("#csrf-input").attr("value");
    SortingNetworkService.DeleteSortingNetwork(snId, csrfTokenName, csrfTokenValue, removeRenderedSortingNetwork);
};

var renderContextMenu = function(e) {
    var canvasId = getCanvasId(e.target);
    var snId = canvasId.substr(0, canvasId.indexOf('-'));
    if ($("#" + canvasId + 1).length === 0) {
        $("#" + canvasId).prev().toggle();
        $("#" + canvasId).before(contextMenuBegining + canvasId + 1 + contextMenuEnding);
        $("#delete-sn").attr("onclick", "deleteSn(event, " + snId + ")");
    }
};

var removeContextMenu = function(e) {
    var canvasId = getCanvasId(e.target);
    if ($("#" + canvasId + 1).length !== 0) {
        $("#" + canvasId + 1).remove();
        $("#" + canvasId).prev().toggle();
    }
};

var addContextMenu = function(networks, networksContainerId) {
    $(networksContainerId + " canvas").parent().mouseover(renderContextMenu);
    $(networksContainerId + " canvas").parent().mouseleave(removeContextMenu);
};