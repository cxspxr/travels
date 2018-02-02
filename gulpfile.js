const gulp = require('gulp');
const server = require('browser-sync').create();
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const argv = require('yargs').argv;
const seq = require('run-sequence');
const rupture = require('rupture');
const rename = require('gulp-rename');

gulp.task('server', function(){
	server.init({
		proxy: 'localhost:8080',
		ghostMode: false,
		open: false,
		notify: false
	});
});

function onError (e) {
	console.log(e.message);
	notifier.notify({
		title: 'stylus error',
		message: e.message + e.filename
	})
}

gulp.task('stylus', function() {
	gulp.src('assets/stylus/main.styl')
		.pipe(gulpif(argv.dev, sourcemaps.init()))
		.pipe(stylus({
            use: [rupture()],
            compress: true
        }).on('error', onError))
		.pipe(autoprefixer())
		.pipe(rename('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css'))
		.pipe(gulpif(argv.dev, server.stream()));
});

gulp.task('default', ['stylus'], function() {
    if(argv.dev){
		seq('server');

		gulp.watch('assets/stylus/**/*', ['stylus']);
		gulp.watch('public/js/*', function(){
			server.reload()
		});
		gulp.watch('public/**/*.html', function(){
			server.reload()
		});
	}
});
