// 必要プラグインの読み込み (var gulp = ~ でも可)
import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webp from 'gulp-webp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import rename from 'gulp-rename';

// 下記でJSからも環境変数を取得可能
const __devMode = process.env.NODE_ENV || 'development';

import webpackConfigDev from './webpack.dev.js'; // 開発環境のときに実行するwebpackのファイル
import webpackConfigProd from './webpack.prod.js'; // 本番環境のときに実行するwebpackのファイル
const webpackConfig =
    __devMode === 'development' ? webpackConfigDev : webpackConfigProd; //本番か開発かどちらかを判断するためのもの
// const webpackConfig = webpackConfigDev;

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPaths = {
    srcDir: `./webpConverter/_toWebP`,
    dstDir: `./webpConverter/_WebP`,
};

// リロード通知タスク
const reloadTask = (done) => {
    browserSync.reload();
    done();
};

// ブラウザ表示（Docker環境用 - スクリプト注入方式）
const connectBrowser = (done) => {
    browserSync.init({
        proxy: 'https://localhost:3000',
        notify: false,
        open: false,
        https: true,
        host: 'localhost',
        port: 3000,
        ui: {
            port: 3001,
        },
        ghostMode: false,
        injectChanges: false,
        reloadOnRestart: true,
        // WordPressテーマに自動リロードスクリプトを注入
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                },
            },
        },
    });
    done();
};

//WebP変換のタスク
export const webpConvert = (done) => {
    gulp.src(imgPaths.srcDir + '/**/*.{png,jpg,jpeg}')
        .pipe(webp())
        .pipe(gulp.dest(imgPaths.dstDir));
    done();
};

// webpackに渡す処理
const webpackTask = () => {
    // webpackStreamの第2引数にwebpackを渡す
    return webpackStream(webpackConfig, webpack).pipe(gulp.dest(`./`));
};

// pugをhtmlに変換
const pugTask = () => {
    const option = {
        // developmentモードの時は圧縮しない
        pretty: __devMode == 'development' ? true : false,
        locals: {
            // pugからlocals.envで開発モードを受け取る
            env: __devMode,
        },
    };
    return gulp
        .src([`./src/pug/*.pug`, `./src/pug/**/*.pug`, `!./src/pug/**/_*.pug`])
        .pipe(
            plumber({
                errorHandler: notify.onError('Error: <%= error.message %>'),
            }),
        )
        .pipe(pug(option))
        .pipe(rename({ extname: '.php' }))
        .pipe(gulp.dest(`./`));
};

//sass,js,pugの監視をして変換処理させる
const watch = (done) => {
    // SASS/JSの変更を監視してwebpackでビルド後リロード
    gulp.watch(
        [`./src/sass/**/*.sass`, `./src/js/**/*.js`],
        gulp.series(webpackTask, reloadTask),
    );

    // Pugファイルの変更を監視してPHPに変換後リロード
    gulp.watch([`./src/pug/**/*.pug`], gulp.series(pugTask, reloadTask));

    // 既存のPHPファイル（functions.phpなど）の変更を監視してリロード
    gulp.watch(
        [`./functions.php`, `./functions/**/*.php`, `./*.php`],
        gulp.series(reloadTask),
    );

    // 生成されたアセットファイルの変更を監視してリロード
    gulp.watch(
        [`./assets/**/*.js`, `./assets/**/*.css`],
        gulp.series(reloadTask),
    );

    done();
};

const defaultTask = gulp.series(watch, connectBrowser, pugTask, webpackTask);

export default defaultTask;
