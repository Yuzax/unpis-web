// 必要プラグインの読み込み (var gulp = ~ でも可)
import gulp from "gulp";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webp from 'gulp-webp';
import plumber from "gulp-plumber";
import browserSync from "browser-sync";
import notify from "gulp-notify";
import pug from "gulp-pug";
import rename from 'gulp-rename';
import connect from 'gulp-connect-php';
import connectSSI from 'connect-ssi';

// 下記でJSからも環境変数を取得可能
const __devMode = (process.env.NODE_ENV || 'development')

import webpackConfigDev from './webpack.dev.js' // 開発環境のときに実行するwebpackのファイル
import webpackConfigProd from './webpack.prod.js' // 本番環境のときに実行するwebpackのファイル
const webpackConfig = __devMode === 'development'? webpackConfigDev : webpackConfigProd //本番か開発かどちらかを判断するためのもの
// const webpackConfig = webpackConfigDev;

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const imgPaths = {
  srcDir : `./webpConverter/_toWebP`,
  dstDir : `./webpConverter/_WebP`
}

// 引数を格納するための変数の記述
const reloadTask = done => {
  browserSync.reload();
  done();
}

// ブラウザ表示
const connectBrowser = done => {
  connect.server({
    root: `./`,
    livereload: true,
  }, () => {
    browserSync.init({
      open: 'external',
      proxy: "127.0.0.1", //適宜変更
      middleware: [
        connectSSI({
            baseDir: __dirname,
            ext: '.php'
        })
      ],
      notify: false
    });
  })
  done();
};

//WebP変換のタスク
export const webpConvert = done => {
  gulp.src(imgPaths.srcDir + "/**/*.{png,jpg,jpeg}")
      .pipe(webp())
      .pipe(gulp.dest(imgPaths.dstDir));
  done();
};

// webpackに渡す処理
const webpackTask = () => {
  // webpackStreamの第2引数にwebpackを渡す
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(`./`));
};

// pugをhtmlに変換
const pugTask = () => {
  const option = {
      // developmentモードの時は圧縮しない
      pretty: __devMode == 'development'? true : false,
      locals: { // pugからlocals.envで開発モードを受け取る
        env: __devMode
      }
  }
  return gulp.src([`./src/pug/*.pug`, `./src/pug/**/*.pug`, `!./src/pug/**/_*.pug`])
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(pug(option))
      .pipe(rename({extname: '.php'}))
      .pipe(gulp.dest(`./`))
};

//sass,js,pugの監視をして変換処理させる
const watch = done => {
    gulp.watch([`./src/sass/**/*.sass`, `./src/js/**/*.js`], gulp.series(webpackTask));
    gulp.watch([`./src/pug/**/*.pug`, `./src/**/**/**/*.pug`], gulp.series(pugTask));
    gulp.watch([`./*.php`, `./assets/**/*.js`, `./assets/**/*.css`,] , gulp.series(reloadTask));
    done();
};

const defaultTask = gulp.series(watch, connectBrowser, pugTask, webpackTask)

export default defaultTask;