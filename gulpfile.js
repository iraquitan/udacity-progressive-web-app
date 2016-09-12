/**
 * Created by iraquitan on 9/12/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: 'google chrome'
    });
});
