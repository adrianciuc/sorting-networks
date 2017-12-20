/*
 TODO: Find other solution to pass the sorting network object to the canvas (current solution is a dirty hack)
 */
var sortingNetworkToRender = null;
var editableCanvasForSortingNetwork = false;

var getTotalNumberOfComparatorsFromSortingNetwork = function (sortingNetwork) {
    var totalNumberOfComparators = 0;
    sortingNetwork.parallelComparators.forEach(function (value, index) { totalNumberOfComparators += value.length });
    return totalNumberOfComparators;
};

var parallelComparatorRepresentation = function (parallelComparator) {
    var gapsOfComparators = [[]];
    parallelComparator.comparators.forEach(function (comparator) {
        var gapIndexFound = null;
        gapsOfComparators.forEach(function (gapOfComparators, gapIndex) {
            if (gapIndexFound === null) {
                var canEnterThisGap = true;
                gapOfComparators.forEach(function (gapComparator) {
                    canEnterThisGap = canEnterThisGap
                        && (gapComparator.bottomWireNumber < comparator.topWireNumber
                        || gapComparator.topWireNumber > comparator.bottomWireNumber);
                });
                if (canEnterThisGap === true) {
                    gapIndexFound = gapIndex;
                }
            }
        });
        if (gapsOfComparators[0].length === 0) {
            gapsOfComparators[0] = [comparator];
        }
        else if (gapIndexFound === null) {
            gapsOfComparators.push([comparator]);
        } else {
            gapsOfComparators[gapIndexFound].push(comparator);
        }
    });
    return gapsOfComparators;
};

var getTotalNumberOfCanvasVerticalLinesForSortingNetwork = function (sortingNetwork) {
    var totalNumberOfGaps = 0;
    sortingNetwork.parallelComparators.forEach(function (parallelComparator) {
        var gapsOfComparators = parallelComparatorRepresentation(parallelComparator);
        totalNumberOfGaps += gapsOfComparators.length;
    });
    return totalNumberOfGaps;
};

var drawSortingNetwork = function(p, sortingNetwork) {
    var numberOfCanvasVerticalLines = getTotalNumberOfCanvasVerticalLinesForSortingNetwork(sortingNetwork);
    console.log(numberOfCanvasVerticalLines);
    var scaleLength = 20 + numberOfCanvasVerticalLines * 25 + numberOfCanvasVerticalLines * 5;
    var scaledHeight = 20 + sortingNetwork.numberOfWires * 25 + sortingNetwork.numberOfWires * 5;
    var canvasLength = scaleLength < 600 ? 600 : scaleLength;
    canvasLength = canvasLength > 975 ? 975 : canvasLength;
    var canvasHeight = scaledHeight < 400 ? 400 : scaledHeight;
    p.createCanvas(canvasLength, canvasHeight).id(sortingNetwork.id + "-" + Math.floor((Math.random() * 1000000)));
    p.background('#152738');
    p.stroke(126);
    p.strokeWeight(5);
    p.wires = [];
    for (var i = 0; i < sortingNetwork.numberOfWires; i++) {
        var x1 = 20;
        var y1 = 10 + (canvasHeight/sortingNetwork.numberOfWires) * i;
        var x2 = canvasLength - 20;
        var y2 = y1;
        p.line(x1, y1, x2, y2);
        p.wires.push(y1);
    }
    var verticalLineIndex = 0;
    var parallelGroupSpaceSeparator;
    for (i = 0; i < sortingNetwork.parallelComparators.length; i++) {
        parallelGroupSpaceSeparator = 40;
        var representation = parallelComparatorRepresentation(sortingNetwork.parallelComparators[i]);
        for (var j = 0; j < representation.length; j++) {
            var x1 = 60 + ((canvasLength - 60 - parallelGroupSpaceSeparator * sortingNetwork.parallelComparators.length) / numberOfCanvasVerticalLines) * verticalLineIndex + parallelGroupSpaceSeparator * i;
            var x2 = x1;
            verticalLineIndex++;
            for (k = 0; k < representation[j].length; k++) {
                var y1 = 10 + (canvasHeight / sortingNetwork.numberOfWires) * (representation[j][k].topWireNumber);
                var y2 = 10 + (canvasHeight / sortingNetwork.numberOfWires) * (representation[j][k].bottomWireNumber);
                p.line(x1, y1, x2, y2);
                p.fill('#fae');
                p.stroke('#fae');
                p.ellipse(x1 + 0.5, y1, 7, 7);
                p.ellipse(x2 + 0.5, y2, 7, 7);
                p.stroke(126);
            }
        }
    }
};

function getTheClosestYOfAWire(p, coordinates, previousMouseY, drawLine) {
    var closestDistance = Number.MAX_VALUE;
    var closest;
    for (var i = 0; i < coordinates.length; i++) {
        var distance = Math.abs(coordinates[i] - p.mouseY);
        if (closestDistance > distance && (coordinates[i] !== previousMouseY || !drawLine)) {
            closest = coordinates[i];
            closestDistance = distance;
        }
    }
    return closest;
}

var sortingNetworkP5Canvas = function(p) {

    var mouseX;
    var mouseY;
    var previousMouseX;
    var previousMouseY;
    var drawLine = false;

    p.setup = function () {
        if (sortingNetworkToRender === null) {
            p.noCanvas();
        } else {
            drawSortingNetwork(p, sortingNetworkToRender)
        }
    };

    if (editableCanvasForSortingNetwork) {
        p.draw = function () {
            if (mouseX && mouseY) {
                if (previousMouseX && previousMouseY && drawLine) {
                    p.stroke(126);
                    p.strokeWeight(5);
                    p.line(previousMouseX, previousMouseY, previousMouseX, mouseY);
                    p.fill('#fae');
                    p.stroke('#fae');
                    p.ellipse(previousMouseX, previousMouseY, 7, 7);
                    p.ellipse(previousMouseX, mouseY, 7, 7);
                    drawLine = false;
                } else {
                    drawLine = true;
                    p.fill('#fae');
                    p.stroke('#fae');
                    p.ellipse(mouseX, mouseY, 7, 7);
                }
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                mouseX = undefined;
                mouseY = undefined;
            }
        };

        p.mousePressed = function () {
            mouseX = p.mouseX;
            mouseY = getTheClosestYOfAWire(p, p.wires, previousMouseY, drawLine);

        };
    }
};
