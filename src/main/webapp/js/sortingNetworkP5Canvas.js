/*
 TODO: Find other solution to pass the sorting network object to the canvas (current solution is a dirty hack)
 */
var sortingNetworkToRender = null;

var sortingNetworkP5Canvas = function(p) {

    p.setup = function () {
        p.createCanvas(600, 400);
        p.background('#152738');
        p.line(12,12,12, 120);
    };
};
