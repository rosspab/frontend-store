const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){
    //identificar archivo sass a compilar
    src('src/scss/**/*.scss')
        .pipe( plumber() )
        .pipe( sass() ) //compilarlo
        .pipe( dest('build/css') )  //almacenarlo
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;

//se ejecuta siempre la palabra gulp + el nombre del export en este caso css entonces seria gulp css