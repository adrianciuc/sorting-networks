var contextMenuBegining = "<div class= \"row context-menu\" id=\"";
var contextMenuEnding = "\"><ul\" class=\"nav navbar-nav\">\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        <!-- The Profile picture inserted via div class below, with shaping provided by Bootstrap -->\n" +
    "                        <div class=\"dots\"></div>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li><a href=\"#\">Edit</a></li>\n" +
    "                        <li>\n" +
    "                            <form id=\"logout-form-id\" class=\"col-sm-offset-1\" action=\"/logout\" method=\"post\">\n" +
    "                                <input type=\"hidden\" name=\"${_csrf.parameterName}\" value=\"${_csrf.token}\"/>\n" +
    "                            </form>\n" +
    "                            <a href=\"#\" onclick=\"$('#logout-form-id').submit()\">Delete</a>\n" +
    "                        </li>\n" +
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

var renderContextMenu = function(e) {
    var canvasId = getCanvasId(e.target);
    if ($("#" + canvasId + 1).length === 0) {
        $("#" + canvasId).prev().toggle();
        $("#" + canvasId).before(contextMenuBegining + canvasId + 1 + contextMenuEnding);
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