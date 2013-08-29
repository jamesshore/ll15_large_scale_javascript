// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var HtmlElement = require("./html_element");
	var SvgCanvas = require("./svg_canvas");

	exports.initialize = function(drawingAreaDiv) {
		var drawingArea = new HtmlElement(drawingAreaDiv);
		var canvas = new SvgCanvas(drawingAreaDiv);

		handleDragEvents(drawingArea, canvas);
		return canvas;
	};

	function handleDragEvents(drawingArea, canvas) {
		var start = null;

		drawingArea.onMouseDown(function(offset) {
			start = offset;
		});

		drawingArea.onMouseMove(function(offset) {
			if (start === null) return;
			canvas.drawLine(start.x, start.y, offset.x, offset.y);
			start = offset;
		});

		drawingArea.onMouseUp(function(offset) {
			start = null;
		});
	}

}());
