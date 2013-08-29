// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/* globals jQuery, $ */

(function() {
	"use strict";

	mocha.setup({ignoreLeaks: true});

	var initializeDrawingArea = require("./drawing_area").initialize;

	describe("Drawing area", function() {

		var drawingArea;
		var svgCanvas;

		beforeEach(function() {
			drawingArea = $("<div style='height: 300px; width: 600px'></div>");
			$(document.body).append(drawingArea);
			svgCanvas = initializeDrawingArea(drawingArea[0]);
		});

		afterEach(function() {
			drawingArea.remove();
		});

		it("draws a line in response to mouse movement", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);

			expect(lines(svgCanvas)).to.eql([
				[20, 30, 30, 300]
			]);
		});

		it("does not draw lines when the mouse button isn't down", function() {
			mouseMove(20, 30);
			mouseMove(30, 300);

			expect(lines(svgCanvas)).to.eql([]);
		});

		it("does not draw lines after mouse button is raised", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);
			mouseUp(30, 300);
			mouseMove(40, 60);

			expect(lines(svgCanvas)).to.eql([
				[20, 30, 30, 300]
			]);
		});

		it("draws consecutive line segments as mouse is moved", function() {
			mouseDown(20, 30);
			mouseMove(30, 300);
			mouseMove(40, 60);
			mouseUp(30, 300);

			expect(lines(svgCanvas)).to.eql([
				[20, 30, 30, 300],
				[30, 300, 40, 60]
			]);
		});

		// Further tests and modularization left as an exercise for the viewer :-)

		function mouseDown(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mousedown", relativeX, relativeY, optionalElement);
		}

		function mouseMove(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mousemove", relativeX, relativeY, optionalElement);
		}

		function mouseUp(relativeX, relativeY, optionalElement) {
			sendMouseEvent("mouseup", relativeX, relativeY, optionalElement);
		}

		function sendMouseEvent(event, relativeX, relativeY, optionalJqElement) {
			var jqElement = optionalJqElement || drawingArea;

			var page = pageOffset(drawingArea, relativeX, relativeY);

			var eventData = new jQuery.Event();
			eventData.pageX = page.x;
			eventData.pageY = page.y;
			eventData.type = event;
			jqElement.trigger(eventData);
		}

		function pageOffset(drawingArea, relativeX, relativeY) {
			var topLeftOfDrawingArea = drawingArea.offset();
			return {
				x: relativeX + topLeftOfDrawingArea.left,
				y: relativeY + topLeftOfDrawingArea.top
			};
		}

		function lines() {
			return svgCanvas.lines();
		}
	});
}());