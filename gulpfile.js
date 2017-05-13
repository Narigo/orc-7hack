const gulp = require("gulp");
const reactBrowserify = require("browserify");
const runSequence = require("run-sequence");
const browserSync = require("browser-sync");
const source = require('vinyl-source-stream');
const babelify = require('babelify'); // Used to convert ES6 & JSX to ES5s
const gutil = require("gulp-util");
const chalk = require("chalk");
const streamify = require("gulp-streamify");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

const wegdeEntryPoint = "src/domain/weg.de/";

gulp.task("react", function () {
  return reactBrowserify({
    entries: [wegdeEntryPoint + "/index.js"],
    debug: true,
    extensions: ['.js', '.jsx']
  })
    .transform(babelify)
    .bundle()
    .on('error', errorLog)
    .pipe(source('react_bundle.js'))
    .pipe(process.env.NODE_ENV === "production" ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest("./build/js"))
});

gulp.task("html", function () {
  return gulp.src([wegdeEntryPoint + "/index.html"]).pipe(gulp.dest("./build"));
});

gulp.task('sass', function () {
  return gulp.src(wegdeEntryPoint + '/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./build/css/style.css'));
});

gulp.task("sync", function () {
  gulp.watch(wegdeEntryPoint + "/**/*.scss", ["sass"]);
  gulp.watch(wegdeEntryPoint + "/index.html", ["html"]);
  gulp.watch(wegdeEntryPoint + "/**/*.{js,jsx}", ["react"]);
});

gulp.task("dev", function (callback) {
  runSequence(["react", "html", "sass"], "sync", callback);
});

function errorLog(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + 'js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.emit("end");
}