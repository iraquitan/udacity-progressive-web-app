/**
 * Created by iraquitan on 9/12/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server

gulp.task('default', function () {
    gulp.watch('./scripts/*.js').on('change', browserSync.reload);
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./styles/*.css').on('change', browserSync.reload);
    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: ['google chrome', 'firefox', 'safari']
    })
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        browser: 'google chrome'
    });
});
