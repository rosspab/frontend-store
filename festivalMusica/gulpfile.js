const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//images
const cache = require('gulp-cache');
const imagemim = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//javascript
const terser = require('gulp-terser-js');

function css(done){
    //identificar archivo sass a compilar
    src('src/scss/**/*.scss')
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() ) //compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )  //almacenarlo
    done();
}

function imagenes (done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemim(opciones)))
        .pipe( dest('build/img'))
    done();
}

function versionWebp( done ){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img'))
    done();
}

function versionAvif( done ){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe(sourcemaps.write('.'))
    .pipe( dest('build/js'))
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

//se ejecuta siempre la palabra gulp + el nombre del export en este caso css entonces seria gulp css