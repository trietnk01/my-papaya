var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var scsslint = require("gulp-scss-lint");
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var critical = require("critical").stream;

function logError(err) {
    if (err.file) {
        console.log("File ==>", err.file);
    }

    if (err.fileName) {
        console.log("File ==>", err.fileName);
    }

    if (err.line) {
        console.log("Line ==>", err.line);
    }

    if (err.lineNumber) {
        console.log("Line ==>", err.lineNumber);
    }

    if (err.message) {
        console.log("Full message ==>", err.message);
    }
}

gulp.task("scss-main", function () {
    return gulp
        .src(["../public/scss/style.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.init())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions", "ie >= 9"]
            })
        )
        .pipe(sourcemaps.write())
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest("../public/scss"));
});

gulp.task("css-main", ["scss-main"], function () {
    return gulp.src(["../public/scss/bundle.css"]).pipe(cleanCSS()).pipe(concat("style.min.css")).pipe(gulp.dest("../public/scss"));
});

gulp.task("default", ["scss-main", "css-main"], function () {
    console.log("/***DONE***/");
});
