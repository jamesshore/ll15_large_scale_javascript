// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
/* globals $ */

(function() {
	"use strict";

	var HtmlElement = module.exports = function HtmlElement(domElement) {
		this._$element = $(domElement);
	};

	HtmlElement.prototype.onMouseDown = function(callback) {
		var $element = this._$element;
		$element.mousedown(function(event) {
			callback(relativeOffset($element, event.pageX, event.pageY));
		});
	};

	HtmlElement.prototype.onMouseMove = function(callback) {
		var $element = this._$element;
		$element.mousemove(function(event) {
			callback(relativeOffset($element, event.pageX, event.pageY));
		});
	};

	HtmlElement.prototype.onMouseUp = function(callback) {
		var $element = this._$element;
		$element.mouseup(function(event) {
			callback(relativeOffset($element, event.pageX, event.pageY));
		});
	};

	function relativeOffset($element, pageX, pageY) {
		var pageOffset = $element.offset();

		return {
			x: pageX - pageOffset.left,
			y: pageY - pageOffset.top
		};
	}

}());