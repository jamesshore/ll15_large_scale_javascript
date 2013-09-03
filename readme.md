Front-End Modules: Namespaces, AMD, and CommonJS
=============

This repository contains the sample source code for the titular [Lessons Learned episode](http://www.letscodejavascript.com/v3/episodes/lessons_learned/14) of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

The source code in this repository demonstrates several different approaches to handling modularity in front-end JavaScript. The application itself is a simple drawing tool borrowed from [Lessons Learned #11](http://www.letscodejavascript.com/v3/episodes/lessons_learned/11).

The repository contains several examples:

1. Baseline, non-modularized code (in `src/single_file`)
2. Namespace object (in `src/namespace`)
3. CommonJS modules (in `src/commonjs`)
4. AMD (in `src/amd`)

Each example (except `single_file`) contains the following files:

* `index.html`: Load this file to run the example.
* `drawing_area.js`: Sets up drawing area and translates events into actions
* `html_element.js`: Abstracts HTML elements (using JQuery)
* `svg_canvas.js`: Abstracts SVG (using Raphael)

In addition, all examples use JQuery and Raphael, which are located in `src/vendor`.

Each example is identical except for the module approach used. For more information about the examples, [watch the screencast](http://www.letscodejavascript.com/v3/episodes/lessons_learned/14).

Note: The tests and modules in these examples are simplified for the purpose of demonstrating differences in modularity approaches. They aren't meant to be examples of good testing or design.


Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip [the source code](https://github.com/jamesshore/ll14_front_end_modules/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `TESTED_BROWSERS` at the top of `Jakefile.js`. Otherwise, comment those lines out.

To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test.


Manual Testing
--------------

Some examples require building before they are run. Here's the procedure for running each example manually:

1. Baseline (non-modularized): open `src/single_file/index.html`
2. Namespace object: open `src/namespace/index.html`.
3. CommonJS modules: run `jake build`, then open `generated/commonjs/index.html`.
4. AMD (development version): open `src/amd/index.html`.
5. AMD (optimized production version): run `jake build`, then open `generated/amd/index.html`.

Note: The `jake build` target is part of the default `jake` run.


License
-------

MIT License. See `LICENSE.TXT`.