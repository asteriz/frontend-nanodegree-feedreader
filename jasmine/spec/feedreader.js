/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed in the allFeeds
         * object and ensures
         * a. it has a URL defined and that the URL is not empty.
         * b. it has a name defined and that the name is not empty.
         */
        allFeeds.forEach(function(element, index, array) {
            describe('Feed ' + index, function() {
                 it('has a URL defined and the URL is not empty', function() {
                    expect(element.url).toBeDefined();
                    expect(element.url).not.toBe("");
                 });
                 it('has a name defined and the name is not empty', function() {
                    expect(element.name).toBeDefined();
                    expect(element.name).not.toBe("");
                 });
             });
        });

    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('the menu element is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('does the menu display when clicked', function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
        });

        it('does it hide when clicked again', function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container', function(done) {
            expect($('.feed .entry')).toBeDefined();
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var titleBakup;
        beforeEach(function(done) {
            titleBakup = $('.header-title').html();
            if (allFeeds.length > 1) {
                loadFeed(1, done);
            } else {
                done();
            }
        });

        it('when a new feed is loaded by the loadFeed function that the content actually changes', function(done) {
            expect(allFeeds.length).toBeGreaterThan(1);
            expect($('.header-title').html()).not.toBe(titleBakup);
            done();
        });
    });

}());
