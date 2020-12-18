// 引入gulp 模块
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');


function css(){
    return gulp
        .src('./css/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}
function cssCommon(){
    return gulp
        .src('./common/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/common'))
}

// 压缩HTML任务
function html1(){
    return gulp 
        .src('./html/**')
        .pipe(htmlmin(
            {
                collapseWhitespace: true, // 表示去除空格
                removeEmptyAttributes: true, // 移出空的属性
                minifyCSS: true, // 压缩 style 标签
                minifyJS: true, // 压缩 script 标签
            }
        ))
        .pipe(gulp.dest('./dist/html'))
}
function html2(){
    return gulp 
        .src('./index.html')
        .pipe(htmlmin(
            {
                collapseWhitespace: true, // 表示去除空格
                removeEmptyAttributes: true, // 移出空的属性
                minifyCSS: true, // 压缩 style 标签
                minifyJS: true, // 压缩 script 标签
            }
        ))
        .pipe(gulp.dest('./dist'))
}

function js(){
    return gulp
        .src('./js/**')
        .pipe(babel({
            presets: ["env"]
       }))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/js'))
}
function jsResource(){
    return gulp
        .src('./resource/js/**')
        .pipe(babel({
            presets: ["env"]
       }))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/resource/js'))
}
// 把任务导出
exports.css = css;
exports.cssCommon = cssCommon;
exports.js = js;
exports.jsResource = jsResource;
exports.html1 = html1;
exports.html2 = html2;