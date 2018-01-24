/*
 TODO: Find other solution to pass the sorting network object to the canvas (current solution is a dirty hack)
 */
var sortingNetworkToRender = null;
var editableCanvasForSortingNetwork = false;
var sortingNetworkInCreationProcess = null;
var snNeedToBeRedrawn = false;
var sortingNetworkStates = [];
var sortingNetworkStatesUndone = [];
var maxNumberOfWiresThatCanBeCheckedAutomatically = 12;

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
    p.canvasLength = canvasLength - 20;
    var canvasHeight = scaledHeight < 400 ? 400 : scaledHeight;
    p.canvasHeight = canvasHeight - canvasHeight/sortingNetwork.numberOfWires + 10;
    p.createCanvas(canvasLength, canvasHeight).id(sortingNetwork.id + "-" + Math.floor((Math.random() * 1000000)));
    p.background('#152738');
    p.stroke(126);
    p.strokeWeight(5);
    p.wires = [];
    p.comparators = [];
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
                p.comparators.push({
                    "parallelComparatorIndex": i,
                    "topWireNumber": representation[j][k].topWireNumber,
                    "bottomWireNumber": representation[j][k].bottomWireNumber,
                    "x": x1,
                    "ytop": y1,
                    "ybottom": y2
                });
            }
        }
    }
};

var getTheClosestYOfAWire = function(p, coordinates, previousMouseY, drawLine) {
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
};

var comparatorCanBeAddedInParallelComparatorsGroup = function (comparator, parallelComparators) {
    var index = parallelComparators.comparators.findIndex(function(element) {
        var elementIsAboveComparator = ((element.topWireNumber < comparator.topWireNumber)
            && (element.bottomWireNumber < comparator.topWireNumber));
        var elementIsBelowComparator = ((element.topWireNumber > comparator.bottomWireNumber)
            && (element.bottomWireNumber > comparator.bottomWireNumber));
        var elementIncludeComparator = (element.topWireNumber < comparator.topWireNumber)
            && (element.bottomWireNumber > comparator.bottomWireNumber);
        var elementIsIncludedInComparator = (element.topWireNumber > comparator.topWireNumber)
            && (element.bottomWireNumber < comparator.bottomWireNumber);
        var elementIsBehindUp = (element.topWireNumber < comparator.topWireNumber)
            && (element.bottomWireNumber > comparator.topWireNumber)
            && (element.bottomWireNumber < comparator.bottomWireNumber);
        var elementIsBehindDown = (element.topWireNumber > comparator.topWireNumber)
            && (element.topWireNumber < comparator.bottomWireNumber)
            && (element.bottomWireNumber > comparator.bottomWireNumber);
        return !(elementIsAboveComparator || elementIsBelowComparator
            || elementIncludeComparator || elementIsIncludedInComparator
            || elementIsBehindUp || elementIsBehindDown);
    });
    return index === -1;
};

var placeComparatorAtTheEnd = function(sortingNetwork, comparator) {
    var lastParallelComparator;
    if (sortingNetwork.parallelComparators.length !== 0) {
        for (var i = sortingNetwork.parallelComparators.length - 1; i >= 0; i--) {
            if (comparatorCanBeAddedInParallelComparatorsGroup(comparator,
                    sortingNetwork.parallelComparators[i])) {
                lastParallelComparator = sortingNetwork.parallelComparators[i]
            } else {
                break;
            }
        }
    }
    lastParallelComparator ?
        lastParallelComparator.comparators.push(comparator)
        : sortingNetwork.parallelComparators.push({"comparators": [comparator]});
};

var placeComparatorInAppropriateParallelComparatorsGroup = function(p, sortingNetwork, comparator) {
    var comparatorAfterAddedComparator = p.comparators.find(function (cmp) {
        return cmp.x >= comparator.x;
    });
    if (comparatorAfterAddedComparator) {
        console.log("Comparator: is not added at the end");
        var pCGroupToBeAddedIndex = comparatorAfterAddedComparator.parallelComparatorIndex;
        var parallelComparatorsToBeTried = [];
        if (pCGroupToBeAddedIndex - 1 >= 0) {
            parallelComparatorsToBeTried.push(sortingNetworkInCreationProcess.parallelComparators[pCGroupToBeAddedIndex - 1]);
        }
        parallelComparatorsToBeTried.push(sortingNetworkInCreationProcess.parallelComparators[pCGroupToBeAddedIndex]);
        var added = false;
        parallelComparatorsToBeTried.forEach(function (pc) {
            if (!added && comparatorCanBeAddedInParallelComparatorsGroup(comparator, pc)) {
                pc.comparators.push(comparator);
                added = true;
            }
        });
        if (!added) {
            console.log("Need to create other group");
            sortingNetworkInCreationProcess.parallelComparators.splice(pCGroupToBeAddedIndex, 0, {"comparators": [comparator]});
        }
    } else {
        placeComparatorAtTheEnd(sortingNetwork, comparator);
    }
};

var preservePreviousSNStatesInUndoArray = function preservePreviousSNStatesInUndoArray() {
    if (sortingNetworkStatesUndone.length !== 0) {
        var lastState = JSON.parse(JSON.stringify(sortingNetworkStates[sortingNetworkStates.length - 1]));
        Array.prototype.push.apply(sortingNetworkStates, sortingNetworkStatesUndone.slice().reverse());
        sortingNetworkStates.pop();
        Array.prototype.push.apply(sortingNetworkStates, sortingNetworkStatesUndone);
        sortingNetworkStates.push(lastState);
    }
    sortingNetworkStatesUndone = [];
    $("#redo-sn-btn").attr("aria-disabled", "true").addClass("disabled").prop("disabled", true);
};

var addComparatorToSortingNetwork = function(p, sortingNetwork, x1, y1, y2) {
    var comparator = {};
    comparator.x = x1;
    comparator.topWireNumber = p.wires.indexOf(Math.min(y1, y2));
    comparator.bottomWireNumber = p.wires.indexOf(Math.max(y1, y2));
    placeComparatorInAppropriateParallelComparatorsGroup(p, sortingNetwork, comparator);
    preservePreviousSNStatesInUndoArray();
    snNeedToBeRedrawn = true;
};

var getComparatorClicked = function(p) {
    var comparatorClicked = null;
    var clickAreaError = 2;
    for (var i = 0; i < p.comparators.length; i++) {
        var toBeChecked = p.comparators[i];
        if (toBeChecked.x + clickAreaError >= p.mouseX
            && toBeChecked.x - clickAreaError <= p.mouseX + 1
            && toBeChecked.ytop <= p.mouseY
            && toBeChecked.ybottom >= p.mouseY) {
            comparatorClicked = toBeChecked;
        }
    }
    return comparatorClicked;
};

var removeComparatorFromSortingNetwork = function(p, comparatorClicked, sortingNetwork) {
    var pcThatContainsClickedComp = sortingNetwork.parallelComparators[comparatorClicked.parallelComparatorIndex];
    var comparatorRemoved = false;
    for (var i = 0; i < pcThatContainsClickedComp.comparators.length; i++) {
        if (pcThatContainsClickedComp.comparators[i].topWireNumber === comparatorClicked.topWireNumber
            && pcThatContainsClickedComp.comparators[i].bottomWireNumber === comparatorClicked.bottomWireNumber) {
            pcThatContainsClickedComp.comparators.splice(i, 1);
            if (pcThatContainsClickedComp.comparators.length === 0) {
                sortingNetwork.parallelComparators.splice(comparatorClicked.parallelComparatorIndex, 1);
            }
            comparatorRemoved = true;
            break;
        }
    }
    if (comparatorRemoved) {
        var snAfterDeletion = {
            "numberOfWires": sortingNetworkInCreationProcess.numberOfWires,
            "id": sortingNetworkInCreationProcess.id,
            "user" : sortingNetworkInCreationProcess.user,
            "parallelComparators": []
        };
        sortingNetwork.parallelComparators.forEach(function(pc) {
            pc.comparators.forEach(function(comp) {
                placeComparatorAtTheEnd(snAfterDeletion, comp);
            });
        });
        sortingNetworkInCreationProcess = snAfterDeletion;
        preservePreviousSNStatesInUndoArray();
        snNeedToBeRedrawn = true;
    }
};

var getNetworkPropertiesContainer = function(sortingNetwork) {
    var element;
    var inTop = $("#sn-properties-" + sortingNetwork.id);
    var inCreation = $("#sn-properties");
    (inTop.length === 0 || $.trim(inTop.html())!=="") ? element = inCreation : element = inTop;
    return element;
};

function getNumberOfComparators(network) {
    return network.parallelComparators.reduce(function (previousValue, element) {
        return previousValue + element.comparators.length;
    }, 0);
}

var showShortNetworkProperties = function (network) {
    var element = getNetworkPropertiesContainer(network);
    var completedClass;
    var completedText;
    if (network.sortsEverything) {
            completedClass = " fa-check-circle green-font ";
            completedText = " Completed "
    } else {
        completedClass = "fa-times-circle red-font";
        completedText = " Not completed "
    }
    var toRender =
        "<span>" +
            "<i class=\"fa " + completedClass + " sn-property-value\" aria-hidden=\"true\"></i>" +
            "<span class='top-username'>" +
                completedText + " having  " +
            "</span>" +
        "</span>" +
        "<span class='sn-property-value'>" +
            getNumberOfComparators(network) +
        "</span>" +
        "<span class='top-username'> " +
            "comparators and " +
        "</span>" +
        "<span class='top-username'> " +
            "depth " +
        "</span>" +
        "<span class='sn-property-value'>" +
            network.parallelComparators.length + "</span>" +
        "&nbsp&nbsp";
    element.html(toRender);
    var otherOne = $("#sn-properties-" + network.id + "-top");
    if (otherOne) {
        otherOne.html(toRender);
    }
};

var showSortingNetworkProperties = function(sortingNetwork) {
    var element = getNetworkPropertiesContainer(sortingNetwork);
    element.html(
        "<span class='top-username'>" +
            "Nr. of wires: " +
        "</span>" +
        "<span class='sn-property-value'>" +
            sortingNetwork.numberOfWires +
        "</span>&nbsp&nbsp" +
        "<span class='top-username'>" +
            "Depth: " +
        "</span>" +
        "<span class='sn-property-value'>" +
            sortingNetwork.parallelComparators.length +
        "</span>&nbsp&nbsp" +
        "<span class='top-username'>" +
            "Nr. of comparators: " +
        "</span>" +
        "<span class='sn-property-value'>"
            + getNumberOfComparators(sortingNetwork) +
        "</span>");
};

var checkSnAuto = function() {
    if (sortingNetworkInCreationProcess.numberOfWires <= maxNumberOfWiresThatCanBeCheckedAutomatically) {
        checkSortingNetwork();
    }
};

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
            if (editableCanvasForSortingNetwork) {
                sortingNetworkInCreationProcess = JSON.parse(JSON.stringify(sortingNetworkToRender));
                drawSortingNetwork(p, sortingNetworkInCreationProcess);
                sortingNetworkStates.push(JSON.parse(JSON.stringify(sortingNetworkInCreationProcess)));
                showSortingNetworkProperties(sortingNetworkInCreationProcess);
                checkSnAuto();
            } else {
                drawSortingNetwork(p, sortingNetworkToRender);
                showShortNetworkProperties(sortingNetworkToRender);
            }
        }
    };

    p.drawNewComparatorIfNeeded = function() {
        if (mouseX && mouseY) {
            if (previousMouseX && previousMouseY && drawLine) {
                p.stroke(126);
                p.strokeWeight(5);
                p.line(previousMouseX, previousMouseY, previousMouseX, mouseY);
                p.fill('#fae');
                p.stroke('#fae');
                p.ellipse(previousMouseX, previousMouseY, 7, 7);
                p.ellipse(previousMouseX, mouseY, 7, 7);
                addComparatorToSortingNetwork(p, sortingNetworkInCreationProcess, mouseX, previousMouseY, mouseY);
                console.log(sortingNetworkInCreationProcess);
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

    if (editableCanvasForSortingNetwork) {
        p.draw = function () {
            if (snNeedToBeRedrawn) {
                p.background('#152738');
                drawSortingNetwork(p, sortingNetworkInCreationProcess);
                snNeedToBeRedrawn = false;
                sortingNetworkStates.push(JSON.parse(JSON.stringify(sortingNetworkInCreationProcess)));
                showSortingNetworkProperties(sortingNetworkInCreationProcess);
                if (sortingNetworkStates.length > 1) {
                    $("#undo-sn-btn").attr("aria-disabled", "false").prop("disabled", false).removeClass("disabled");
                }
                checkSnAuto();
            }
            p.drawNewComparatorIfNeeded();
        };

        p.mousePressed = function () {
            if (p.mouseButton === p.LEFT && p.mouseX >= 0 && p.mouseY >=0
                && p.mouseX <= p.canvasLength && p.mouseY <= p.canvasHeight) {
                mouseX = p.mouseX;
                mouseY = getTheClosestYOfAWire(p, p.wires, previousMouseY, drawLine);
            }
            if (p.mouseButton === p.RIGHT) {
                var comparatorClicked = getComparatorClicked(p);
                if (comparatorClicked) {
                    removeComparatorFromSortingNetwork(p, comparatorClicked, sortingNetworkInCreationProcess);
                }
            }
        };
    }
};
