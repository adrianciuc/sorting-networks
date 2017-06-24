/*
 TODO: Find other solution to pass the sorting network object to the canvas (current solution is a dirty hack)
 */
var sortingNetworkToRender = null;

var drawSortingNetwork = function(p, sortingNetwork) {
    var comparators = [];
    sortingNetwork.parallelComparators.forEach(function (value, index) {comparators = comparators.concat(value.comparators)});
    var scaleLength = 20 + comparators.length * 25 + comparators.length * 5;
    var scaledHeight = 20 + sortingNetwork.numberOfWires * 25 + sortingNetwork.numberOfWires * 5;
    var canvasLength = scaleLength < 600 ? 600 : scaleLength;
    canvasLength = canvasLength > 975 ? 975 : canvasLength;
    var canvasHeight = scaledHeight < 400 ? 400 : scaledHeight;
    p.createCanvas(canvasLength, canvasHeight);
    p.background('#152738');
    p.stroke(126);
    p.strokeWeight(5);
    for (var i = 0; i < sortingNetwork.numberOfWires; i++) {
        var x1 = 20;
        var y1 = 10 + (canvasHeight/sortingNetwork.numberOfWires) * i;
        var x2 = canvasLength - 20;
        var y2 = y1;
        p.line(x1, y1, x2, y2);
    }
    for (i = 0; i < comparators.length; i++) {
        var x1 = 40 + ((canvasLength - 60)/comparators.length) * i;
        var y1 = 10 + (canvasHeight/sortingNetwork.numberOfWires) * (comparators[i].topWireNumber);
        var x2 = x1;
        var y2 = 10 + (canvasHeight/sortingNetwork.numberOfWires) * (comparators[i].bottomWireNumber);
        p.line(x1, y1, x2, y2);
        p.fill('#fae');
        p.stroke('#fae');
        p.ellipse(x1, y1, 7, 7);
        p.ellipse(x2, y2, 7, 7);
        p.stroke(126);
    }
};

var sortingNetworkP5Canvas = function(p) {

    p.setup = function () {
        if (sortingNetworkToRender === null) {
            p.noCanvas();
        } else {
            drawSortingNetwork(p, sortingNetworkToRender)
        }
    };
};
