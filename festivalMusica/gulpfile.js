const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//images
const webp = require('gulp-webp');

function css(done){
    //identificar archivo sass a compilar
    src('src/scss/**/*.scss')
        .pipe( plumber() )
        .pipe( sass() ) //compilarlo
        .pipe( dest('build/css') )  //almacenarlo
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

function dev(done){
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);

//se ejecuta siempre la palabra gulp + el nombre del export en este caso css entonces seria gulp css