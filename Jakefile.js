// Copyright (c) 2012-2013 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	var TESTED_BROWSERS = [
		"IE 8.0.0 (Windows XP)",
		"IE 9.0.0 (Windows 7)",
		"Firefox 23.0.0 (Mac OS X 10.8)",
		"Chrome 29.0.1547 (Mac OS X 10.8.4)",
		"Safari 6.0.5 (Mac OS X 10.8.4)",
		"Mobile Safari 6.0.0 (iOS 6.1)"
	];

	var fs = require("fs");
	var shell = require("shelljs");

	var browserify = require("browserify");   // CommonJS

	var lint = require("./build/util/lint_runner.js");
	var karma = require("./build/util/karma_runner.js");

	var GENERATED_DIR = "generated";
	var VENDOR_BUILD_DIR = GENERATED_DIR + "/vendor";
	var COMMONJS_BUILD_DIR = GENERATED_DIR + "/commonjs";

	directory(VENDOR_BUILD_DIR);
	directory(COMMONJS_BUILD_DIR);

	desc("Lint and test");
	task("default", ["lint", "test"], function() {
		console.log("\n\nOK");
	});

	desc("Start Karma server -- run this first");
	task("karma", function() {
		karma.serve(complete, fail);
	}, {async: true});

	desc("Lint everything");
	task("lint", [], function () {
		var passed = lint.validateFileList(browserFilesToLint(), browserLintOptions(), browserGlobals());
		if (!passed) fail("Lint failed");
	});

	desc("Test browser code");
	task("test", ["build"], function() {
		karma.runTests(TESTED_BROWSERS, complete, fail);
	}, {async: true});

	desc("Build CommonJS");
	task("build", ["browserify", "vendor"]);

	task("browserify", ["commonjs_dir"], function() {
		var b = browserify();
		b.require("./src/commonjs/drawing_area.js", {expose: "./drawing_area"} );
		b.bundle({ debug: true }, function(err, bundle) {
			if (err) fail(err);
			fs.writeFileSync(COMMONJS_BUILD_DIR + "/bundle.js", bundle);
			complete();
		});
	}, {async: true});

	task("commonjs_dir", [COMMONJS_BUILD_DIR], function() {
		shell.rm("-rf", COMMONJS_BUILD_DIR + "/*");
		shell.cp("-R", "src/commonjs/*.html", COMMONJS_BUILD_DIR);
	});

	desc("Build vendor files");
	task("vendor", [VENDOR_BUILD_DIR], function() {
		shell.rm("-rf", VENDOR_BUILD_DIR + "/*");
		shell.cp("-R", "src/vendor/*", VENDOR_BUILD_DIR);
	});

	function browserFilesToLint() {
		var files = new jake.FileList();
		files.include("src/**/*.js");
		files.exclude("src/vendor/*.js");
		return files.toArray();
	}

	function browserLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: false,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: true,
			browser: true
		};
	}

	function browserGlobals() {
		return {
			// CommonJS
			require: false,
			module: false,
			exports: false,

			// Mocha / expect.js
			mocha: false,
			describe: false,
			it: false,
			expect: false,
			dump: false,
			beforeEach: false,
			afterEach: false
		};
	}

}());