const gulp = require("gulp");

gulp.task("react", function () {
  return reactBrowserify({
    entries: ["js/ValveScout/index.js"],
    debug: true,
    extensions: ['.js', '.jsx']
  })
    .transform(babelify)
    .bundle()
    .on('error', errorLog)
    .pipe(source('react_bundle.js'))
    .pipe(process.env.NODE_ENV === "production" ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.reload({stream: true}));
});
