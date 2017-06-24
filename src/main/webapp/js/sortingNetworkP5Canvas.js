/*
 TODO: Find other solution to pass the sorting network object to the canvas (current solution is a dirty hack)
 */
var sortingNetworkToRender = null;

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
    var verticalLineIndex = 0;
    var paralelGroupSpaceSeparator;
    for (i = 0; i < sortingNetwork.parallelComparators.length; i++) {
        paralelGroupSpaceSeparator = 40;
        var representation = parallelComparatorRepresentation(sortingNetwork.parallelComparators[i]);
        for (var j = 0; j < representation.length; j++) {
            var x1 = 60 + ((canvasLength - 60 - paralelGroupSpaceSeparator * sortingNetwork.parallelComparators.length) / numberOfCanvasVerticalLines) * verticalLineIndex + paralelGroupSpaceSeparator * i;
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

var sortingNetworkP5Canvas = function(p) {

    p.setup = function () {
        if (sortingNetworkToRender === null) {
            p.noCanvas();
        } else {
            drawSortingNetwork(p, sortingNetworkToRender)
        }
    };
};
