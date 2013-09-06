Large-Scale JavaScript Fundamentals with Karma and CommonJS
=============

This repository contains the sample source code for the titular [Lessons Learned episode](http://www.letscodejavascript.com/v3/episodes/lessons_learned/15) of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

The source code in this repository demonstrates two issues of fundamental importance to large-scale JavaScript development: unit testing and modularity. The application itself is a simple drawing tool borrowed from [Lessons Learned #11](http://www.letscodejavascript.com/v3/episodes/lessons_learned/11).

Things to notice in the source code:

1. Unit testing using Karma, Mocha, and expect.js (in `src/commonjs/_*_test.js`)
2. Modularity using CommonJS (in `src/commonjs/*.js`)
3. Direct testing of CommonJS modules in Karma using karma-commonjs (in `build/config/karma.conf.js`)

For more information about this example, [watch the screencast](http://www.letscodejavascript.com/v3/episodes/lessons_learned/15).

Note: The tests and modules in this example is simplified for the purpose of demonstrating the approach. They aren't meant to be examples of good testing or design.

Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip [the source code](https://github.com/jamesshore/ll15_large_scale_javascript/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `TESTED_BROWSERS` at the top of `Jakefile.js`. Otherwise, comment those lines out.

To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test.


Manual Testing
--------------

To see the code run:

1. Run `./jake.sh build` (Unix/Mac) or `jake build` to build the CommonJS code.
2. Open `generated/commonjs/index.html`

Note: The `jake build` target is part of the default `jake` run.


License
-------

MIT License. See `LICENSE.TXT`.
