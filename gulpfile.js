const { src, dest, task, series, watch, parallel } = require("gulp");

const rm = require("gulp-rm"),  //плагин удаления файлов
    sass = require("gulp-sass"), //плагин sass
    concat = require("gulp-concat"), //плагин склейки файлов
    browserSync = require("browser-sync").create() //плагин сервера, вызываем метод create для создания сервера
    reload = browserSync.reload, //для перезагрузки сервера
    sassGlob = require("gulp-sass-glob"), //плагин продвинутого импорта стилей (работает толко с gulp-sass)
    autoprefixer = require("gulp-autoprefixer"), //плагин автопрефиксов
    px2rem = require("gulp-smile-px2rem"), //плагин перевода из px в rem
    gcmq = require("gulp-group-css-media-queries"), //плагин группировки медиа-запросов
    cleanCSS = require("gulp-clean-css"), //плагин минификации css
    sourcemaps = require("gulp-sourcemaps"),  //плагин sourcemaps
    babel = require('gulp-babel'),  //плагин трансляции ES6
    uglify = require('gulp-uglify'), //плагин минификации JS
    svgo = require("gulp-svgo"), //плагин убирает лишнее из SVG
    svgSprite = require("gulp-svg-sprite"), //собирает все файлы SVG в один
    gulpif = require("gulp-if"), //плагин условия
    notify = require("gulp-notify"), //плагин внешних уведомлений
    wait = require("gulp-wait"); //плагин временоой задержки

const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require("./gulp.config"); //подключаем файл конфига

const env = process.env.NODE_ENV;   //переменная окружения (Dev vs Prod)

sass.compiler = require("node-sass"); //используем препроцессор nodeJS

//удаление файлов
task("clean", () => {  
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());   
});

//копирование файлов
task("copy:html", () => {       
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});
task("copy:img", () => {
    return src(`${SRC_PATH}/img/**/*.*`)
        .pipe(dest(`${DIST_PATH}/img`))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});
task("copy:fonts", () => {
    return src(`${SRC_PATH}/fonts/**/*.*`)
        .pipe(dest(`${DIST_PATH}/fonts`))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});
task("copy:json", () => {
    return src(`${SRC_PATH}/JSON/**/*.*`)
        .pipe(dest(`${DIST_PATH}/JSON`))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});
/*
task("copy:video", () => {
    return src(`${SRC_PATH}/video/*.mp4`)
        .pipe(dest(`${DIST_PATH}/video`))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});
*/
task("copy:ico", () => {
    return src(`${SRC_PATH}*.ico`)
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({ stream: true })); //перезагрузим браузер (задача выполняется внутри потока (stream:true))
});

//пути к normalize.css 
//и работа со стилями
task("styles", () => {
    return src([...STYLES_LIBS, `${SRC_PATH}/scss/main.scss`])
        .pipe(gulpif(env==='dev', sourcemaps.init())) //инициализация запись sourcemap 
        .pipe(wait(1000))
        .pipe(concat("main.min.scss"))  //склеиваем normalize.css и main.scss
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))   //вывод ошибки при компиляции scss, { outputStyle: 'expand' } - красивый код выходного css
        //.pipe(px2rem())   //переведем единицы измерения (px->rem)
        .pipe(gulpif(env==='dev', 
            autoprefixer({
                browsers: ["last 2 versions"],  //поддержка двух последних браузеров
                cascade: false  //cascade делает отступы префикс-свойств 
            })
        ))     
        .pipe(gulpif(env==='prod', gcmq()))   //группируем медиа запросы 
        .pipe(gulpif(env==='prod', cleanCSS()))  //минифмцируем css
        .pipe(gulpif(env==='dev', sourcemaps.write()))  //произведем запись sourcemap 
        .pipe(dest(`${DIST_PATH}/css`))
        .pipe(reload({stream: true}));
});

task("server", function() {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false, //не запускать браузер при старте сервера
        notify: false
    });
});

//и работа со скриптами
task("scripts", ()=>{
    return src([...JS_LIBS,`${SRC_PATH}/js/*.js` ])
        .pipe(gulpif(env==='dev',sourcemaps.init())) //инициализация запись sourcemap 
        .pipe(concat("main.min.js"))  //склеиваем normalize.css и main.scss, {newLine: ";"} - раздлитель м/у файлами
        /* .pipe(babel({
            presets: ['@babel/env']
        })) */
        .pipe(gulpif(env==='prod',uglify()))
        .pipe(gulpif(env==='dev',sourcemaps.write()))  //произведем запись sourcemap 
        .pipe(dest(`${DIST_PATH}/js`))
        .pipe(reload({stream: true}));
});

//работа с SVG
task("icons", ()=> {
    return src(`${SRC_PATH}/img/*.svg`)
        .pipe(svgo({
            plugins: [
                {
                    removeAttr: { attrs: "(fill|stroke|style|width|height|data.*)" }
                }
            ]
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../spite.svg"
                }
            }
        }))
        .pipe(dest(`${DIST_PATH}/img/`));    
});

//слежка за файлами
task("watch", ()=> {
    watch(`./${SRC_PATH}/*.html`, series("copy:html"));
    watch(`./${SRC_PATH}/scss/**/*.scss`, series("styles"));
    watch(`./${SRC_PATH}/js/*.js`, series("scripts"));
    //watch("./${SRC_PATH}/img/*.svg", series("icons"));
});



//по-умолчанию - dev
task(
    "default", 
    series( "clean", 
        parallel( 
            parallel( "copy:html", "copy:img", "copy:fonts", "copy:json", "copy:ico", "styles", "scripts"),             
            parallel( "watch", "server")
        )
    )
);

//build
task(
    "build", 
    series( "clean",
        parallel( "copy:html", "copy:img", "copy:fonts", "copy:json", "copy:ico", "styles", "scripts")                        
    )    
);
