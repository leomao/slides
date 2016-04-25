'use strict';

// This file is Copyright 2015 - Charles R. Severance (@drchuck) and
// is licensed under the MIT license.

function clearSketchCanvas() {
    // It would be nice to move this code into sketch.js
    var ske = $('#sketchCanvas').sketch();
    if ( ske.actions.length < 1 ) return;
    ske.actions = [];
    ske.action = [];

    $('#sketchCanvas').sketch().redraw();
}

// Create a very large div and set up sketch on it.
// Start the div behind the normal content
// http://intridea.github.io/sketch.js/
$(document).ready( function() {
    // Take 20px off because of the bottom bar of the browser
    $('body').append(`<div id="sketchDiv" style="position:fixed; top:1px; left:1px; z-index:-2">
        <canvas id="sketchCanvas" height="${screen.height}" width="${screen.width}">
            Your browser does not support HTML5 Canvas.
        </canvas>
      </div>`);
    $(function() {
        $('#sketchCanvas').sketch();
    });

    if ( typeof Reveal !== 'undefined') {
        Reveal.addEventListener( 'slidechanged', function( event ) {
            clearSketchCanvas();
            $('#sketchDiv').css('background-color','transparent')
        } );
    }
});

// Global variable for pen size
var currentSketchSize = 2; 

// Grab and process a few keypreses

// ` (next to the 1) erase and turn off drawing
// 1 Yellow
// 2 Green
// 3 Cyan
// 4 Red
// 5 White
// 6 Blue
// 7 Magenta
// 8 Black
// - Make pen smaller
// = Make pen larger

// http://stackoverflow.com/questions/8510470/capturing-document-level-keypress-events-with-javascript
// https://github.com/SethosII/reveal.js-jump-plugin/blob/master/jump/jump.js

$(document).keypress(function(event)
{
    var w = event.which;

    var colors = ['#ff0', '#0f0', '#0ff', '#f00', '#fff', '#00f', '#f0f', '#000'];
    var sizes = [1, 2, 3, 5, 8, 10, 15];

    if ( true && w >=49 && w < 49+colors.length) {
        var newcolor = colors[w-49];
        $('#sketchCanvas').sketch().set('color', newcolor);
        $('#sketchDiv').css( "zIndex", 2);
    } else if ( w == 96 ) {
        clearSketchCanvas();
        $('#sketchDiv').css( "zIndex", -2);
    } else if ( w == 45 ) { // Minus key
        if ( currentSketchSize > 0 ) {
            currentSketchSize--;
            $('#sketchCanvas').sketch().set('size', sizes[currentSketchSize]);
        }
    } else if ( w == 61 ) { // Equals key
        if ( currentSketchSize < sizes.length-1 ) {
            currentSketchSize++;
            $('#sketchCanvas').sketch().set('size', sizes[currentSketchSize]);
        }
    } else if ( w == 80 ) { // P
        var bgcolor = $('#sketchDiv').css('background-color');
        if ( bgcolor === 'transparent' || bgcolor === 'rgba(0, 0, 0, 0)') {
            $('#sketchDiv').css('background-color','white')
        } else {
            $('#sketchDiv').css('background-color','transparent')
        }
    } else if (w == 82) {
        MathJax.Hub.Rerender();
    }
});

